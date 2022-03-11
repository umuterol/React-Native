import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState } from "react";
import CartItem from "./CartItem";
import Colors from "../../constans/Colors";
import Card from "../UI/Card";

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card style={styles.container}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>{props.amount}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        title={showDetails ? "Hide Details" : "Show Details"}
        color={Colors.primary}
        onPress={() => setShowDetails(!showDetails)}
      />
      <View style={styles.orderDetails}>
        {showDetails &&
          props.items.map((item) => (
            <CartItem
              key={item.productId}
              productId={item.productId}
              quantity={item.quantity}
              title={item.productTitle}
              amount={item.sum}
            />
          ))}
      </View>
    </Card>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    margin: 20,
    alignItems: "center",
    padding: 10,
  },
  summary: {
    flexDirection: "row",
    marginBottom: 10,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    width: "100%",
  },
  totalAmount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  date: {
    fontFamily: "open-sans",
    fontSize: 16,
    color: "#888",
  },
  orderDetails: {
    width: "100%",
    paddingHorizontal: 20,
  },
});
