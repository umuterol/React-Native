import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
} from "react-native";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constans/Colors";
import HeaderCart from "../../components/UI/HeaderCart";
import * as cartActions from '../../store/actions/cart'

const ProductDetailScreen = (props) => {
  const productId = props.route.params.productId;
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();
  useEffect(() => {
    props.navigation.setOptions({ headerTitle: props.route.params.title });
  }, []);
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderCart
          amount={cartTotalAmount}
          onSelect={() => props.navigation.navigate("Cart")}
        />
      ),
    });
  }, [cartTotalAmount]);

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button
          title="Add To Card"
          color={Colors.primary}
          onPress={() => dispatch(cartActions.addToCart(selectedProduct))}
        />
      </View>
      <Text style={styles.price}>${selectedProduct.price}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  actions: {
    alignItems: "flex-end",
    margin: 10,
  },
  price: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
    color: "#888",
  },
  description: {
    marginHorizontal: 20,
    textAlign: "center",
    fontFamily: "open-sans",
  },
});
