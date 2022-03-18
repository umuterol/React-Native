import {
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  Button,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import HeaderMenu from "../../components/UI/HeaderMenu";
import { useSelector, useDispatch } from "react-redux";
import * as ordersActions from "../../store/actions/orders";
import OrderItem from "../../components/shop/OrderItem";
import Colors from "../../constans/Colors";

const OrdersScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const ORDERS = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();

  const loadOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      await dispatch(ordersActions.fetchOrders());
      setError(null);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  useEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <HeaderMenu onSelect={() => props.navigation.toggleDrawer()} />
      ),
    });
  }, []);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error accurred.</Text>
        <Button title="Try again" onPress={loadOrders} />
      </View>
    );
  }

  if (!isLoading && ORDERS.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No orders found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={ORDERS}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.amount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
