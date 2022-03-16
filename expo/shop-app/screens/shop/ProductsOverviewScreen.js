import React, { useEffect, useState, useCallback } from 'react'
import { FlatList, Button, ActivityIndicator, View, StyleSheet, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import HeaderCart from '../../components/UI/HeaderCart'
import * as cartActions from '../../store/actions/cart'
import * as productsActions from '../../store/actions/products'
import HeaderMenu from '../../components/UI/HeaderMenu'
import Colors from '../../constans/Colors'

const ProductsOverviewScreen = props => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const products = useSelector(state => state.products.availableProducts)
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const dispatch = useDispatch();

    // useEffect(
    //     () => props.navigation.addListener('focus', loadProducts),
    //     []
    // );

    const loadProducts = useCallback(async () => {
        setIsLoading(true)
        try {
            await dispatch(productsActions.fetchProducts());
            setError(null)
        } catch (error) {
            setError(error.message)
        }
        setIsLoading(false)
    }, [])

    useEffect(() => {
        const focusSub=props.navigation.addListener('focus', loadProducts)
        // props.navigation.addListener('blur', () => alert('Screen was unfocused'))
        return focusSub;
    }, [loadProducts])

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

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetail', {
            productId: id,
            title: title,
        })
    }


    if (isLoading) {
        return <View style={styles.centered}>
            <ActivityIndicator
                color={Colors.primary}
                size={50}
            />
        </View>
    }

    if (error) {
        return <View style={styles.centered}>
            <Text>An error occurred!</Text>
            <Button title='Try again' onPress={loadProducts} />
        </View>
    }

    if (!isLoading && products.length === 0) {
        return <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Text>No products found.</Text>
        </View>
    }

    return (
        <FlatList
            keyExtractor={item => item.id}
            data={products}
            renderItem={(itemData) =>
                <ProductItem
                    imageUrl={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => selectItemHandler(itemData.item.id, itemData.item.title)}
                >
                    <Button
                        color={Colors.primary}
                        title="View Details"
                        onPress={() => selectItemHandler(itemData.item.id, itemData.item.title)}
                    />
                    <Button
                        color={Colors.primary}
                        title="Add To Cart"
                        onPress={() => { dispatch(cartActions.addToCart(itemData.item)) }}
                    />
                </ProductItem>}
        />
    )
}

export default ProductsOverviewScreen;

const styles = StyleSheet.create({
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
})