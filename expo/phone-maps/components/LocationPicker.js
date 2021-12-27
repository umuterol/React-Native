import React, { useState, useRef } from 'react';
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet
} from 'react-native';

import MapView from './MapView';

const LocationPicker = props => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();
  const start = useRef(true);


  const getLocationHandler = async () => {
    try {
      setIsFetching(true);
      const response = await fetch('https://location-5e8be-default-rtdb.firebaseio.com/currentLocation/-MquOke75lUT6bPsdSHA.json');
      const location = await response.json();
      setPickedLocation({
        lat: location.lat,
        lng: location.lng,
      });
    } catch (err) {
      Alert.alert(
        'Could not fetch location!',
        'Please try again later or pick a location on the map.',
        [{ text: 'Okay' }]
      );
    }
    setIsFetching(false);
  };

  if (start.current) {
    start.current = false;
    let i=0;
    getLocationHandler();
    setInterval(() => {
      getLocationHandler();
      console.log(++i);
    }, 60000);
  }

  return (
    <View style={{ ...props.style }}>
      <MapView style={styles.mapPreview} location={pickedLocation}>
        {isFetching ? (
          <ActivityIndicator size="large" color={"purple"} />
        ) : (
          <Text>No location chosen yet!</Text>
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: '100%',
  }
});

export default LocationPicker;
