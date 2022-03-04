import React from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import Colors from '../constants/Colors'
import DefaultText from '../components/DefaultText'

const MealItem = props => {
    return <TouchableOpacity activeOpacity={0.7} onPress={props.onSelect}>
        <View style={styles.mealItem}>
            <View style={styles.mealHeader}>
                <ImageBackground style={styles.image} source={{ uri: props.image }}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title} numberOfLines={1}>{props.title}</Text>
                    </View>
                </ImageBackground>
            </View>
            <View style={styles.mealDetail}>
                <DefaultText>{props.duration}m</DefaultText>
                <DefaultText color={props.complexity.color}>{props.complexity.value.toUpperCase()}</DefaultText>
                <DefaultText>{props.affordability.toUpperCase()}</DefaultText>
            </View>
        </View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    mealItem: {
        width: '100%',
        height: 200,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 20,      
        borderBottomColor:Colors.primaryColor,
        borderBottomWidth:1,
    },
    mealHeader: {
        height: '85%',
    },
    mealDetail: {
        flexDirection: 'row',
        height: '15%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    image: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
    titleContainer: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 12,
        paddingVertical: 5,
    },
    title: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 18,
        textAlign:'center',
    }
})

export default MealItem;