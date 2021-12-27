import React from "react";
import { TextInput, StyleSheet } from "react-native";

const Input = (props) => {
  return <TextInput {...props} style={{ ...style.input, ...props.style }}></TextInput>;
};

const style = StyleSheet.create({
  input: {
    height: 40,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginVertical: 10,
    textAlign: 'center'
  },
});

export default Input;
