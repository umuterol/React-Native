import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
});
