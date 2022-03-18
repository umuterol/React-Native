import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as cartActions from "../../store/actions/cart";
import * as ordersActions from "../../store/actions/orders";
import Colors from "../../constans/Colors";
import CartItem from "../../components/shop/CartItem";
import Card from "../../components/UI/Card";

const CartScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        ...state.cart.items[key],
      });
    }
    return transformedCartItems;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred!", error, [
        { text: "Okay", style: "default" },
      ]);
    }
  }, [error]);

  const orderHandler = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:
          <Text style={styles.amount}> ${cartTotalAmount.toFixed(2)}</Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator color={Colors.primary} />
        ) : (
          <Button
            color={Colors.accent}
            title="Order Now"
            disabled={cartItems.length === 0}
            onPress={orderHandler}
          />
        )}
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            productId={itemData.item.productId}
            onDelete={() =>
              dispatch(cartActions.removeFromCart(itemData.item.productId))
            }
            deletable
          />
        )}
      />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 20,
    marginVertical: 10,
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});
