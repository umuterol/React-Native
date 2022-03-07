import React, { useEffect } from 'react'
import { View, Text, FlatList, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import HeaderCart from '../../components/UI/HeaderCart'
import * as cartActions from '../../store/actions/cart'
import HeaderMenu from '../../components/UI/HeaderMenu'

const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts)
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const dispatch = useDispatch();

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <HeaderCart
                    amount={cartTotalAmount}
                    onSelect={() => props.navigation.navigate('Cart')}
                />
            ),
            headerLeft: () => (
                <HeaderMenu
                    onSelect={() => props.navigation.toggleDrawer()}
                />
            ),
        })
    }, [cartTotalAmount])
    return (
        <FlatList
            keyExtractor={item => item.id}
            data={products}
            renderItem={(itemData) =>
                <ProductItem
                    imageUrl={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onViewDetail={() => {
                        props.navigation.navigate('ProductDetail', {
                            productId: itemData.item.id,
                            title: itemData.item.title,
                        })
                    }}
                    onAddToCart={() => { dispatch(cartActions.addToCart(itemData.item)) }}
                />}
        />
    )
}

export default ProductsOverviewScreen;