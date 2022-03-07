import { FlatList, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import HeaderMenu from '../../components/UI/HeaderMenu'
import { useSelector } from 'react-redux'
import OrderItem from '../../components/shop/OrderItem'

const OrdersScreen = (props) => {
  const ORDERS = useSelector(state => state.orders.orders).reverse();

  useEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <HeaderMenu
          onSelect={() => props.navigation.toggleDrawer()}
        />
      ),
    })
  }, [])
  return (
    <FlatList
      data={ORDERS}
      renderItem={(itemData => (
        <OrderItem
          amount={itemData.item.amount}
          date={itemData.item.readableDate}
          items={itemData.item.items} />
      ))}
    />
  )
}

export default OrdersScreen

const styles = StyleSheet.create({})