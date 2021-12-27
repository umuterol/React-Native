import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter'; //veya useFonts import from 'expo-font'
import MealsNavigator from './navigation/MealsNavigator';
import { enableScreens } from 'react-native-screens';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import mealReducer from './store/reducer/mealReducer';
import FlashMessage from "react-native-flash-message";

const combineStore = combineReducers({
  meal: mealReducer,
})
const store = createStore(combineStore)


enableScreens();//verimlilik arttırıyor ders 126

export default function App() {

  const [fontsLoaded] = useFonts({
    Inter_900Black,
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }
  //Navigator güvenli alanı otomatik olarak sağlıyor softAreaView
  return <Provider store={store}>
    <MealsNavigator />
    <FlashMessage position="bottom" />
  </Provider>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
