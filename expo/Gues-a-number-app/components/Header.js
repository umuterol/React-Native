import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";


import Colors from "../constants/Colors";

const Header = (props) => {
  return (
    <View style={style.header}>
      <Text style={{
        ...style.headerTitleBase,
        ...Platform.select({
          ios: style.headerTitleIos,
          android: style.headerTitleAndroid
        })
      }}>{props.children}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  header: {
    width: '100%',
    height: 96,
    // paddingTop: 30,
    backgroundColor: Platform.OS === 'ios' ? Colors.primary : 'transparent',
    borderBottomColor: Platform.OS === 'android' ? '#ccc' : 'transparent',
    borderBottomWidth: Platform.OS === 'android' ? 1 : 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleBase: {
    fontSize: 18,
    fontFamily: 'lobster',
  },
  headerTitleAndroid: {
    color: Colors.primary,
  },
  headerTitleIos: {
    color: 'white',
  },
});

export default Header;
