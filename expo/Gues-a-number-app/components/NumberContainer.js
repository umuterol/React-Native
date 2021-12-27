import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const NumberContainer = (props) => {
  style.container = {
    ...style.container,
    borderColor: props.color || Colors.primary,
  };
  style.number = { ...style.number, color: props.color || Colors.primary };

  return (
    <View style={style.container}>
      <Text style={style.number}>
        {props.children}
      </Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    marginVertical: 10,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  number: {
    fontSize: 22,
  },
});

export default NumberContainer;
