import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Alert,
  FlatList,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import BodyText from "../components/BodyText";
import Card from "../components/Card";
import NumberContainer from "../components/NumberContainer";
import MainButton from "../components/MainButton";
import Colors from "../constants/Colors";
import TitleText from "../components/TitleText";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNumber = Math.floor(Math.random() * (max - min)) + min;

  if (rndNumber === exclude) return generateRandomBetween(min, max, exclude);

  return rndNumber;
};

const renderListItem = (listLength, itemData) => (
  <View style={style.listItem}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <NumberContainer color={Colors.accent}>{itemData.item}</NumberContainer>
  </View>
);

const GameScreen = (props) => {
  const initialGues = useRef(generateRandomBetween(1, 100, props.userChoice));
  const [currentGues, setCurrentGues] = useState(initialGues.current);
  const [pastGuesses, setPastGuesses] = useState([initialGues.current]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const { userChoice, onGameOver } = props;
  const [avaiableDeviceWidth, setAvaiableDeviceWidth] = useState(Dimensions.get('window').width);
  const [avaiableDeviceHeight, setAvaiableDeviceHeight] = useState(Dimensions.get('window').height);

  useEffect(() => {
    console.log("useEffect")
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setAvaiableDeviceHeight(window.height);
      setAvaiableDeviceWidth(window.width);
    });
    return () => subscription?.remove();
  })

  useEffect(() => {
    if (currentGues === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGues, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && props.userChoice > currentGues) ||
      (direction === "greater" && props.userChoice < currentGues)
    ) {
      Alert.alert("Don't lie", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      currentHigh.current = currentGues;
    } else if (direction === "greater") {
      currentLow.current = currentGues + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGues
    );
    setCurrentGues(nextNumber);
    // setRound((curRounds) => curRounds + 1);
    setPastGuesses((curPastGuesses) => [nextNumber, ...curPastGuesses]);
  };

  let listContainer = style.listContainer;
  if (Dimensions.get('window').width < 350) {
    listContainer = style.listContainerBig;
  }

  if (avaiableDeviceHeight < 600) {
    console.log("heightIF : " + avaiableDeviceHeight)
    return <View style={style.screen}>
      <View style={style.handlerContainer}>
        <BodyText>Opponent's Guess</BodyText>
        <View style={style.controls}>
          <MainButton
            borderRadius={25}
            onPress={nextGuessHandler.bind(this, "lower")}
          >
            <Ionicons name="md-remove" size={25} color="white" />
          </MainButton>
          <NumberContainer>{currentGues}</NumberContainer>
          <MainButton
            borderRadius={25}
            onPress={nextGuessHandler.bind(this, "greater")}
          >
            <Ionicons name="md-add" size={25} color="white" />
          </MainButton>
        </View>
      </View>
      <View style={listContainer}>
        <FlatList
          contentContainerStyle={style.list}
          data={pastGuesses}
          keyExtractor={item => item}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
        />
      </View>
    </View>
  }

  return (
    <View style={style.screen}>
      <View style={style.handlerContainer}>
        <BodyText>Opponent's Guess</BodyText>
        <NumberContainer>{currentGues}</NumberContainer>
        <Card style={style.buttonContainer}>
          <MainButton
            borderRadius={25}
            onPress={nextGuessHandler.bind(this, "lower")}
          >
            <Ionicons name="md-remove" size={25} color="white" />
          </MainButton>
          <MainButton
            borderRadius={25}
            onPress={nextGuessHandler.bind(this, "greater")}
          >
            <Ionicons name="md-add" size={25} color="white" />
          </MainButton>
        </Card>
      </View>
      <View style={listContainer}>
        {/* <ScrollView contentContainerStyle={style.list}>
          {pastGuesses.map((gues, index) =>
            renderListItem(gues, pastGuesses.length - index)
          )}
        </ScrollView> */}

        <FlatList
          contentContainerStyle={style.list}
          data={pastGuesses}
          keyExtractor={item => item}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
        />

      </View>
    </View>
  );
};

const style = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 30,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: 300,
    maxWidth: "80%",
    justifyContent: "space-around",
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '60%'
  },
  handlerContainer: {
    padding: 10,
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.accent,
    borderRadius: 30,
    overflow: "hidden",
  },
  listItem: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 5,
    paddingHorizontal: 15,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  listContainer: {
    width: '60%',
    marginVertical: 20,
    flex: 1, //scrollView ' i View ile sardığımızdan View da android'de flex 1 olmalı
  },
  listContainerBig: {
    width: '80%',
    marginVertical: 10,
    flex: 1, //scrollView ' i View ile sardığımızdan View da android'de flex 1 olmalı
  },
  list: {
    // alignItems: "center",
    justifyContent: "flex-end",
    flexGrow: 1,
  },
});

export default GameScreen;
