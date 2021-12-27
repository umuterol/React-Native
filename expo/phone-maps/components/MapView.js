import React from 'react';
import { View, Image, StyleSheet } from 'react-native';


const MapView = props => {
  let imagePreviewUrl;

  if (props.location) {
    imagePreviewUrl = 
    // "https://maps.googleapis.com/maps/api/staticmap?center=36.577322,36.1610327&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C36.577322,36.1610327&key=AIzaSyAtuGsaesvaujVDFIm8D41nkxXJrKkSrPk"
    `https://maps.googleapis.com/maps/api/staticmap?center=${
      props.location.lat
    },${
      props.location.lng
    }&zoom=14&size=1280x1024&maptype=roadmap&markers=color:red%7Clabel:B%7C${
      props.location.lat
    },${props.location.lng}&key=AIzaSyAtuGsaesvaujVDFIm8D41nkxXJrKkSrPk`;
  }

  return (
    <View style={{...styles.mapPreview,...props.style}}>
      {props.location ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        props.children
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapImage: {
    width: '100%',
    height: '100%'
  }
});

export default MapView;

