import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constans/Colors';

const HeaderCart = props => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={props.onSelect}
            style={styles.container}
        >
            <Text style={styles.amount}>${props.amount.toFixed(2)}</Text>
            <Ionicons name='md-cart' size={24} color={Colors.accent} />
        </TouchableOpacity>
    )
}

export default HeaderCart

const styles = StyleSheet.create({
    amount: {
        fontFamily: 'open-sans-bold',
        color: 'white',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})