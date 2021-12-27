import React from "react";
import { View, Text, StyleSheet, Button, Image, Dimensions, ScrollView } from "react-native";
import BodyText from "../components/BodyText";
import Card from "../components/Card";
import NumberContainer from "../components/NumberContainer";
import defaultStyles from "../constants/default-styles"; //BodyText ve TitleText component'larına alternatif olarak kullandım her iki türlüde çalışılabilir.
import Colors from "../constants/Colors";
import * as ScreenOrientation from 'expo-screen-orientation'

const GameOverScreen = (props) => {
  // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT); //Game over sayfası için ekranı PORTRAIT Modunda kilitler
  return (
    <ScrollView>
      <View style={style.screen}>
        <Text style={defaultStyles.titleText}>This Game is Over!</Text>
        <Text style={defaultStyles.bodyText}>good game</Text>
        <View style={style.imageContainer}>
          <Image
            fadeDuration={1500}
            source={require("../assets/success.png")}
            // source={{uri:'https://summitguides.org/wp-content/uploads/2017/10/20171015_124525.jpg'}}
            style={style.image}
            resizeMode={"cover"}
          />
        </View>

        <View style={style.resultContainer}>
          <BodyText style={style.resultText}>
            Your phone needed{" "}
            <Text style={style.highLight}>{props.guesRounds}</Text> rounds to
            guess the number{" "}
            <Text style={style.highLight}>{props.userNumber}</Text>.
          </BodyText>
        </View>

        <Button title="NEW GAME" onPress={props.onRestart}></Button>

        <Text numberOfLines={1} ellipsizeMode="tail" style={{ marginHorizontal: 60, marginTop: 50 }}> {/*ellipsize sığmayan metnin nasıl kesileceği*/}
          All rights reserved. <Text style={style.highLight}>UMUT GAMES </Text>
          All rights reserved. <Text style={style.highLight}>UMUT GAMES</Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop:10,
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginVertical: 5,
  },
  imageContainer: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderRadius: Dimensions.get('window').width * 0.7 / 2,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: Dimensions.get('window').height / 60,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: Dimensions.get('window').height / 40,
  },
  resultText: {
    // fontFamily:'open-sans-bold', //sadece text component style ozelliklerini cocugu olan text e aktarır icindeki diger text componentta bu ozellige sahip olur
    fontSize: Dimensions.get('window').height < 600 ? 18 : 22,
    textAlign: "center",
  },
  highLight: {
    color: Colors.primary,
    fontFamily: "open-sans-bold",
  },
});

export default GameOverScreen;
