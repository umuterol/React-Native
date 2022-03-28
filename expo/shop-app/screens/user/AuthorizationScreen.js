import { StyleSheet, Text, View, Button, Alert } from "react-native";
import React, { useCallback, useReducer, useState } from "react";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import Colors from "../../constans/Colors";
import { AntDesign } from "@expo/vector-icons";
import * as authActions from "../../store/actions/auth";
import { useDispatch } from "react-redux";

const AuthorizationScreen = (props) => {
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const authHandler = async () => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input!", "Please check the errors in the form.", [
        { text: "Okay", style: "default" },
      ]);
      return;
    }
    try {
      let action;
      if (isSignup) {
        action = authActions.signup(
          formState.inputValues.email,
          formState.inputValues.password
        );
      } else {
        action = authActions.login(
          formState.inputValues.email,
          formState.inputValues.password
        );
      }
      await dispatch(action);
    } catch (error) {
      console.log(error.message);
    }
  };

  const inputChangeHandler = useCallback(
    (inputId, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        id: inputId,
        value: inputValue,
        isValid: inputValidity,
      });
    },
    [dispatchFormState]
  );

  return (
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Log In</Text>
        <AntDesign name="login" size={30} color="black" />
      </View>
      <Card style={styles.formCard}>
        <Input
          label="Email"
          id="email"
          errorText="Please enter a valid email!"
          onInputChange={inputChangeHandler}
          keyboardType="email-address"
          email
          required
          autoCapitalize="none"
        />
        <Input
          label="Password"
          id="password"
          errorText="Please enter a valid password!"
          onInputChange={inputChangeHandler}
          minLength={6}
          secureTextEntry={true}
          required
          autoCapitalize="none"
        />
        <View style={styles.btn}>
          <Button
            title={isSignup ? "Sign Up" : "Login"}
            color={isSignup ? Colors.accent : Colors.primary}
            onPress={authHandler}
          />
        </View>
        <Text
          style={{
            ...styles.switchText,
            color: isSignup ? Colors.primary : Colors.accent,
          }}
          onPress={() => setIsSignup((prevState) => !prevState)}
        >
          Switch to {isSignup ? "Login" : "Sign Up"}
        </Text>
      </Card>
    </View>
  );
};

export default AuthorizationScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formCard: {
    width: "80%",
    maxWidth: 300,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    marginTop: 10,
    width: "50%",
  },
  switchText: {
    marginTop: 10,
    fontFamily: "open-sans-bold",
    fontSize: 15,
  },
  headerText: {
    fontFamily: "open-sans-bold",
    fontSize: 40,
    color: "#888",
    marginRight: 10,
  },
  headerContainer: {
    width: "80%",
    maxWidth: 300,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
});

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
