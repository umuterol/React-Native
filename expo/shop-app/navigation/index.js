import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Screens from './screens'
import Colors from '../constans/Colors'
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes'

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Shop = () => (
    <Stack.Navigator
        screenOptions={
            {
                headerStyle: {
                    backgroundColor: Colors.primary,
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                    fontFamily: 'open-sans-bold'
                }
            }
        }
    >
        <Stack.Screen
            name='ProductsOverview'
            component={Screens.ProductsOverview}
            options={{ title: 'All Product' }} />
        <Stack.Screen
            name='ProductDetail'
            component={Screens.ProductDetail}
            options={{ headerTitle: "Product Detail" }} />
        <Stack.Screen
            name='Cart'
            component={Screens.Cart}
            options={{ headerTitle: "Cart" }} />
    </Stack.Navigator>
)

const Orders = () => (
    <Stack.Navigator
        screenOptions={
            {
                headerStyle: {
                    backgroundColor: Colors.primary,
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                    fontFamily: 'open-sans-bold'
                }
            }
        }
    >
        <Stack.Screen
            name='OrdersScreen'
            component={Screens.Orders}
            options={{ title: "Your Orders" }
            }
        />
    </Stack.Navigator>
)

const User = () => (
    <Stack.Navigator
        screenOptions={
            {
                headerStyle: {
                    backgroundColor: Colors.primary,
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                    fontFamily: 'open-sans-bold'
                }
            }
        }
    >
        <Stack.Screen
            name='UserScreen'
            component={Screens.UserProducts}
            options={{ title: "Your Products" }
            }
        />
        <Stack.Screen
            name='EditProductScreen'
            component={Screens.editProduct}
            options={{ title: "Edit Products" }
            }
        />
    </Stack.Navigator>
)


export default () => {
    return <NavigationContainer>
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerContentContainerStyle: {
                    marginTop: '25%'
                },
                drawerStyle: {
                    opacity: 0.8,
                    justifyContent: 'center',
                    backgroundColor: Colors.accent
                },
                drawerLabelStyle: {
                    color: 'black',
                    fontFamily: 'open-sans-bold'
                },
                drawerActiveBackgroundColor: Colors.primary,
                drawerActiveTintColor: 'white',
                drawerInactiveTintColor: Colors.primary,
            }}
        >
            <Drawer.Screen
                name='Shop'
                component={Shop}
                options={{
                    drawerIcon: drawerConfig => <Ionicons
                        name='cart'
                        color={drawerConfig.color}
                        size={drawerConfig.size} />
                }} />
            <Drawer.Screen
                name='Orders'
                component={Orders}
                options={{
                    drawerIcon: drawerConfig => <Ionicons
                        name='list'
                        color={drawerConfig.color}
                        size={drawerConfig.size} />
                }} />
            <Drawer.Screen
                name='User'
                component={User}
                options={{
                    drawerIcon: drawerConfig => <Ionicons
                        name='create'
                        color={drawerConfig.color}
                        size={drawerConfig.size} />
                }} />
        </Drawer.Navigator>
    </NavigationContainer>
}