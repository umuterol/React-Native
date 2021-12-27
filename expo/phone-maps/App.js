import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , Image } from 'react-native';
import LocationPicker from './components/LocationPicker';

import MapView from './components/MapView';
const uri='https://maps.googleapis.com/maps/api/staticmap?center=36.577322,36.1610327&zoom=14&size=1200x1200&maptype=roadmap&markers=color:purple%7Clabel:B%7C36.577322,36.1610327&key=AIzaSyAtuGsaesvaujVDFIm8D41nkxXJrKkSrPk';
export default function App() {
  return (
    <View style={styles.container}>
      <LocationPicker style={styles.mapPreview}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#99ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPreview:{
    width:'100%',
    height:'50%'
  }
});
