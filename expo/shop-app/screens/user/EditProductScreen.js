import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useCallback, useReducer, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as productsActions from "../../store/actions/products";
import { Ionicons } from "@expo/vector-icons";
import Input from "../../components/UI/Input";
import Colors from "../../constans/Colors";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedInputValues = {
      ...state.inputValues,
      [action.id]: action.value,
    };
    const updatedInputValidities = {
      ...state.inputValidities,
      [action.id]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedInputValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedInputValidities[key];
    }
    return {
      inputValues: updatedInputValues,
      inputValidities: updatedInputValidities,
      formIsValid: updatedFormIsValid,
    };
  }
  return state;
};

const EditProductScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const productId = props.route.params ? props.route.params.productId : null;
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === productId)
  );
  const dispatch = useDispatch();
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      description: editedProduct ? editedProduct.description : "",
      price: "",
    },
    inputValidities: {
      title: !!editedProduct,
      imageUrl: !!editedProduct,
      description: !!editedProduct,
      price: !!editedProduct,
    },
    formIsValid: !!editedProduct,
  });

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input!", "Please check the errors in the form.", [
        { text: "Okay", style: "default" },
      ]);
      return;
    }
    setIsLoading(true);
    try {
      setError(null);
      if (!editedProduct)
        await dispatch(
          productsActions.createProduct(
            formState.inputValues.title,
            formState.inputValues.imageUrl,
            formState.inputValues.description,
            formState.inputValues.price
          )
        );
      else
        await dispatch(
          productsActions.updateProduct(
            productId,
            formState.inputValues.title,
            formState.inputValues.imageUrl,
            formState.inputValues.description,
            formState.inputValues.price
          )
        );
      props.navigation.goBack();
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [dispatch, productId, formState]);

  useEffect(() => {
    props.navigation.setOptions({
      title: editedProduct ? editedProduct.title + " Edit" : "Add Product",
    });
  }, []);

  useEffect(() => {
    props.navigation.setOptions({
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

  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred!", error, [
        { text: "Okay", style: "default" },
      ]);
    }
  }, [error]);

  const inputChangeHandler = useCallback(
    (inputId, inputValue, inputValidity = true) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        id: inputId,
        value: inputValue,
        isValid: inputValidity,
      });
    },
    [dispatchFormState]
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior="height"
      keyboardVerticalOffset={100}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            label="Title"
            id="title"
            onInputChange={inputChangeHandler}
            errorText="Please enter a valid title!"
            initialValue={editedProduct ? editedProduct.title : ""}
            initiallyValid={!!editedProduct}
            required
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
          />
          <Input
            label="Image Url"
            id="imageUrl"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            errorText="Please enter a valid image url!"
            initialValue={editedProduct ? editedProduct.imageUrl : ""}
            initiallyValid={!!editedProduct}
            required
          />
          {!editedProduct && (
            <Input
              label="Price"
              id="price"
              onInputChange={inputChangeHandler}
              errorText="Please enter a valid price !"
              keyboardType="number-pad"
              returnKeyType="next"
              min={0.1}
              required
            />
          )}
          <Input
            label="Description"
            id="description"
            onInputChange={inputChangeHandler}
            errorText="Please enter a valid description!"
            initialValue={editedProduct ? editedProduct.description : ""}
            initiallyValid={!!editedProduct}
            keyboardType="default"
            minLength={15}
            multiline
            numberOfLines={2}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProductScreen;

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});
