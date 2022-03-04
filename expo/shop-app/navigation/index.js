import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Screens from './screens'
import Colors from '../constans/Colors'

const Stack = createNativeStackNavigator();

export default () => (
    <NavigationContainer>
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
                options={{ headerTitle: "All Product" }} />
            <Stack.Screen
                name='ProductDetail'
                component={Screens.ProductDetail}
                options={{ headerTitle: "Product Detail" }} />
            <Stack.Screen
                name='Cart'
                component={Screens.Cart}
                options={{ headerTitle: "Cart" }} />
        </Stack.Navigator>
    </NavigationContainer>
)