import React, { useEffect } from 'react'
import { FlatList, Button, ActivityIndicator, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import HeaderCart from '../../components/UI/HeaderCart'
import * as cartActions from '../../store/actions/cart'
import * as productsActions from '../../store/actions/products'
import HeaderMenu from '../../components/UI/HeaderMenu'
import Colors from '../../constans/Colors'

const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts)
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productsActions.fetchProducts());
    }, [])

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

    if (products.length === 0) {
        return <View style={{ justifyContent: 'center', alignItems: 'center', flex:1 }}>
            <ActivityIndicator
                color={Colors.primary}
                size={50}
            />
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