import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions, //Cihaz boyutları
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";

import Card from "../components/Card";
import Colors from "../constants/Colors";
import Input from "../components/Input"; //cihazın işletim sistemine göre .android veya .ios olanını kullanacaktır.
import NumberContainer from "../components/NumberContainer";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";

const StartGamesScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState("");
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      console.log("test change") //burada sürekli event listener olayını listeye ekleme olayı sorunu çözülmedi
      setButtonWidth(window.width / 4)
    });
    return () => subscription?.remove();
  })


  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };
  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number!",
        "Number has to be a number between 1 and 99",
        [{ text: "okay", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }

    setConfirmed(true);
    setEnteredValue("");
    setSelectedNumber(chosenNumber);
    Keyboard.dismiss();
  };

  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card style={style.summaryContainer}>
        <Text>You Selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={() => props.onStartGame(selectedNumber)}>
          START GAME
        </MainButton>
      </Card>
    );
  }

  return (

    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={10}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={style.screen}>
            <TitleText style={style.title}>Start a New Game!</TitleText>
            <Card style={style.inputContainer}>
              <BodyText>Select a number</BodyText>
              <Input
                style={style.input}
                maxLength={2}
                autoCapitalize="none"
                autoCorrect={false}
                blurOnSubmit
                keyboardType="number-pad"
                onChangeText={numberInputHandler}
                value={enteredValue}
              />
              <View style={style.buttonContainer}>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title="RESET"
                    color={Colors.accent}
                    onPress={resetInputHandler}
                  ></Button>
                </View>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title="CONFIRM"
                    color={Colors.primary}
                    onPress={confirmInputHandler}
                  ></Button>
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    marginVertical: 20,
  },
  inputContainer: {
    width: 350,
    minWidth: '80%',
    maxWidth: "100%",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 25,
  },
  // button: {
  //   width: Dimensions.get('window').width / 4,//cihaz genişliğinin 4 te 1 i
  // },
  input: {
    width: 50,
    alignItems: "center",
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center", //tam kaplayan kutu ortaladığımız icin sayi ne kadarsa o kadar genişler
  },
});

export default StartGamesScreen;
