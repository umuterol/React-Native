import { StyleSheet, FlatList, Button } from "react-native";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as productsActions from "../../store/actions/products";
import ProductItem from "../../components/shop/ProductItem";
import HeaderMenu from "../../components/UI/HeaderMenu";
import Colors from "../../constans/Colors";
import { Ionicons } from "@expo/vector-icons";

const UserProductsScreen = (props) => {
  const dispatch = useDispatch();
  const userProducts = useSelector((state) => state.products.userProducts);

  const editProduct = (productId) => {
    props.navigation.navigate("EditProductScreen", {
      productId,
    });
  };

  useEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <HeaderMenu onSelect={() => props.navigation.toggleDrawer()} />
      ),
      headerRight: () => (
        <Ionicons
          name="create"
          size={23}
          color="white"
          onPress={() => {
            props.navigation.navigate("EditProductScreen");
          }}
        />
      ),
    });
  }, []);

  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={userProducts}
      renderItem={(itemData) => (
        <ProductItem
          imageUrl={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            editProduct(itemData.item.id);
          }}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              editProduct(itemData.item.id);
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => {
              dispatch(productsActions.deleteUserProduct(itemData.item.id));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

export default UserProductsScreen;

const styles = StyleSheet.create({});
