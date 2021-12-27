import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, TouchableNativeFeedback, Platform } from "react-native";

import Colors from "../constants/Colors";

const MainButton = props => {
    let ButtonComponent = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        ButtonComponent = TouchableNativeFeedback;
    }

    return <View style={{
        ...styles.buttonContainer,
        backgroundColor: props.color || Colors.primary,
        borderRadius: props.borderRadius || 5,
    }}>
        <ButtonComponent onPress={props.onPress} activeOpacity={0.9}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>
                    {props.children}
                </Text>
            </View>
        </ButtonComponent>
    </View>
}

const styles = StyleSheet.create({
    buttonContainer: {
        overflow: 'hidden',
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    buttonText: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 15,
    }
})

export default MainButton;