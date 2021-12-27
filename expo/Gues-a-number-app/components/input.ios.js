import React from "react";
import { TextInput, StyleSheet } from "react-native";

import Colors from "../constants/Colors";

const Input = (props) => {
    return <TextInput {...props} style={{ ...style.input, ...props.style }}></TextInput>;
};

const style = StyleSheet.create({
    input: {
        height: 40,
        borderBottomColor: Colors.primary,
        borderBottomWidth: 1,
        marginVertical: 10,
        textAlign: 'center'
    },
});

export default Input;
