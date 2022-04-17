import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useReducer, useState, useEffect } from "react";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import Colors from "../../constans/Colors";
import { AntDesign } from "@expo/vector-icons";
import * as authActions from "../../store/actions/auth";
import { useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

const AuthorizationScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
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

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred", error, [
        { text: "Okay", style: "default" },
      ]);
    }
  }, [error]);

  const authHandler = async () => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input!", "Please check the errors in the form.", [
        { text: "Okay", style: "default" },
      ]);
      return;
    }
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
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.replace("ShopDrawer");
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
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
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Log In</Text>
          <AntDesign name="login" size={30} color="black" />
        </View>
        <Card style={styles.formCard}>
          <ScrollView>
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
            {isLoading ? (
              <ActivityIndicator color={Colors.primary} size="large" />
            ) : (
              <>
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
              </>
            )}
          </ScrollView>
        </Card>
      </LinearGradient>
    </View>
  );
};

export default AuthorizationScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formCard: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  btn: {
    marginTop: 10,
  },
  switchText: {
    marginTop: 10,
    fontFamily: "open-sans",
    fontSize: 15,
    textAlign: "center",
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
