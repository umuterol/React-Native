import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as productsActions from "../../store/actions/products";
import { Ionicons } from "@expo/vector-icons";

const EditProductScreen = (props) => {
  const productId = props.route.params ? props.route.params.productId : null;
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === productId)
  );
  const dispatch = useDispatch();

  const [price, setPrice] = useState("");
  const [title, setTitle] = useState(editedProduct ? editedProduct.title : "");
  const [imageUrl, setImageUrl] = useState(
    editedProduct ? editedProduct.imageUrl : ""
  );
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : ""
  );

  const submitHandler = useCallback(() => {
    if (!editedProduct)
      dispatch(
        productsActions.createProduct(title, imageUrl, description, price)
      );
    else
      dispatch(
        productsActions.updateProduct(productId, title, imageUrl, description)
      );
  }, [dispatch, title, imageUrl, description, price]);

  useEffect(() => {
    props.navigation.setOptions({
      title: editedProduct ? editedProduct.title + " Edit" : "Add Product",
    });
  }, []);

  useEffect(() => {
    props.navigation.setOptions({
      title: editedProduct ? editedProduct.title + " Edit" : "Add Product",
      headerRight: () => (
        <Ionicons
          name="checkmark"
          size={23}
          color="white"
          onPress={submitHandler}
        />
      ),
    });
  }, [submitHandler]);

  return (
    <View style={styles.form}>
      <View style={styles.formControl}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      </View>
      <View style={styles.formControl}>
        <Text style={styles.label}>Image Url</Text>
        <TextInput
          style={styles.input}
          value={imageUrl}
          onChangeText={setImageUrl}
        />
      </View>
      <View style={styles.formControl}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
        />
      </View>
      {!editedProduct && (
        <View style={styles.formControl}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
          />
        </View>
      )}
    </View>
  );
};

export default EditProductScreen;

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
    marginVertical: 8,
  },
  label: {
    fontFamily: "open-sans-bold",
  },
  input: {
    fontFamily: "open-sans",
    borderBottomColor: "#888",
    borderBottomWidth: 1,
    paddingHorizontal: 1,
    paddingVertical: 3,
  },
});
