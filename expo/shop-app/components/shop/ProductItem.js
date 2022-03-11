import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  Image,
  Button,
} from "react-native";
import React from "react";
import Colors from "../../constans/Colors";
import Card from "../UI/Card";

const ProductItem = (props) => {
  return (
    <Card style={styles.product}>
      <TouchableNativeFeedback useForeground={true} onPress={props.onSelect}>
        <View>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: props.imageUrl }} />
          </View>
          <View style={styles.details}>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              {props.title}
            </Text>
            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
          </View>
          <View style={styles.actions}>{props.children}</View>
        </View>
      </TouchableNativeFeedback>
    </Card>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  product: {
    margin: 20,
    height: 300,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    overflow: "hidden",
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  details: {
    alignItems: "center",
    height: "15%",
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
    fontFamily: "open-sans-bold",
  },
  price: {
    fontSize: 14,
    color: "#888",
    fontFamily: "open-sans",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: "25%",
    alignItems: "center",
  },
});
