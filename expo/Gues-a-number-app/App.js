import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, Dimensions, SafeAreaView } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { FontAwesome5 } from "@expo/vector-icons";

//Components
import Header from "./components/Header";
import GameOverScreen from "./screens/GameOverScreen";
import GameScreen from "./screens/GameScreen";
import StartGamesScreen from "./screens/StartGamesScreen";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    lobster: require("./assets/fonts/Lobster-Regular.ttf"),
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guesRounds, setGuesRaounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [visibleHeader, setVisibleHeader] = useState(Dimensions.get('window').height > 600);

  //kendi yorumum normalde kullanımı useEffect ile
  const controlAddEventListener = useRef(false);
  if (!controlAddEventListener.current) {
    Dimensions.addEventListener('change', ({ window }) => {
      setVisibleHeader(window.height > 600)
    })
  }

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={() => console.log("App Loading Error!")}
      />
    );
  }



  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = (round) => {
    setGuesRaounds(round);
  };

  const configureNewGameHandler = () => {
    setGuesRaounds(0);
    setUserNumber(null);
  };

  let screen = (
    <StartGamesScreen onStartGame={startGameHandler}></StartGamesScreen>
  );
  if (userNumber && guesRounds <= 0) {
    screen = (
      <GameScreen
        userChoice={userNumber}
        onGameOver={gameOverHandler}
      ></GameScreen>
    );
  } else if (guesRounds > 0) {
    screen = (
      <GameOverScreen
        guesRounds={guesRounds}
        userNumber={userNumber}
        onRestart={configureNewGameHandler}
      ></GameOverScreen>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      {/*cihaz çentikleriyle çakışmayı önler SafeAreaView*/}
      {
        visibleHeader ?
          <Header>
            <FontAwesome5 name="think-peaks" size={40}></FontAwesome5>
            <Text>Gues a Number</Text>
          </Header>
          : null
      }
      {screen}
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});