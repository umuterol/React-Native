import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux';
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../constans/Colors';

const CartItem = props => {
    const imageUrl = useSelector(state =>
        state.products.availableProducts.find(prod => props.productId === prod.id).imageUrl)


    return (
        <View style={styles.cartItem}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <View style={styles.cartData}>
                <Text style={styles.mainTxt}>
                    <Text style={styles.quantity}>{props.quantity}</Text>
                    <Text style={{ color: 'red' }}> x </Text>{props.title}
                </Text>
            </View>
            <View style={styles.cartData}>
                <Text style={styles.mainTxt}>${props.amount.toFixed(2)}</Text>
                <TouchableOpacity onPress={props.onDelete} style={styles.deleteBtn}>
                    <MaterialIcons name="delete" size={23} color="red" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CartItem

const styles = StyleSheet.create({
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    cartData: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '30%',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 5,
    },
    mainTxt: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
        textAlign: 'center'
    },
    quantity: {
        color: '#888',
    },
    deleteBtn: {
        marginLeft: 10,
    }
})