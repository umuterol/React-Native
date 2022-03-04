import { StyleSheet, Text, View, Button, FlatList } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as cartActions from '../../store/actions/cart'
import Colors from '../../constans/Colors'
import CartItem from '../../components/shop/CartItem'

const CartScreen = () => {
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        ...state.cart.items[key]
      })
    }
    return transformedCartItems;
  })
  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:<Text style={styles.amount}> ${cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          color={Colors.accent}
          title='Order Now'
          disabled={cartItems.length === 0} />

      </View>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.productId}
        renderItem={itemData => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            productId={itemData.item.productId}
            onDelete={() => dispatch(cartActions.removeFromCart(itemData.item.productId))} />
        )}
      />
    </View>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 20,
    elevation: 5,
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  }
})