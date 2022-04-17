import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import React, { useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import Screens from "./screens";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from '../store/actions/auth'
import Colors from "../constans/Colors";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Shop = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTintColor: "white",
      headerTitleStyle: {
        fontFamily: "open-sans-bold",
      },
    }}
  >
    <Stack.Screen
      name="ProductsOverview"
      component={Screens.ProductsOverview}
      options={{ title: "All Product" }}
    />
    <Stack.Screen
      name="ProductDetail"
      component={Screens.ProductDetail}
      options={{ headerTitle: "Product Detail" }}
    />
    <Stack.Screen
      name="Cart"
      component={Screens.Cart}
      options={{ headerTitle: "Cart" }}
    />
  </Stack.Navigator>
);

const Orders = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTintColor: "white",
      headerTitleStyle: {
        fontFamily: "open-sans-bold",
      },
    }}
  >
    <Stack.Screen
      name="OrdersScreen"
      component={Screens.Orders}
      options={{ title: "Your Orders" }}
    />
  </Stack.Navigator>
);

const User = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTintColor: "white",
      headerTitleStyle: {
        fontFamily: "open-sans-bold",
      },
    }}
  >
    <Stack.Screen
      name="UserScreen"
      component={Screens.UserProducts}
      options={{ title: "Your Products" }}
    />
    <Stack.Screen
      name="EditProductScreen"
      component={Screens.editProduct}
      options={{ title: "Edit Products" }}
    />
  </Stack.Navigator>
);

const AuthorizationStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTintColor: "white",
      headerTitleStyle: {
        fontFamily: "open-sans-bold",
      },
    }}
  >
    <Stack.Screen
      name="Authorization"
      component={Screens.Authorization}
      options={{ title: "Authorization" }}
    />
  </Stack.Navigator>
)


const ShopDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerContentContainerStyle: {
          marginTop: "25%",
        },
        drawerStyle: {
          opacity: 0.8,
          justifyContent: "center",
          backgroundColor: Colors.accent,
        },
        drawerLabelStyle: {
          color: "black",
          fontFamily: "open-sans-bold",
        },
        drawerActiveBackgroundColor: Colors.primary,
        drawerActiveTintColor: "white",
        drawerInactiveTintColor: Colors.primary,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Shop"
        component={Shop}
        options={{
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name="cart"
              color={drawerConfig.color}
              size={drawerConfig.size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={Orders}
        options={{
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name="list"
              color={drawerConfig.color}
              size={drawerConfig.size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="User"
        component={User}
        options={{
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name="create"
              color={drawerConfig.color}
              size={drawerConfig.size}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => {
          dispatch(authActions.logout())
          // props.navigation.replace('AuthorizationStack');
        }}
        labelStyle={{ alignSelf: 'flex-end', color: 'white', fontFamily: 'open-sans-bold' }}
      />
    </DrawerContentScrollView>
  );
}

export default () => {
  const isAuth = useSelector(state => !!state.auth.token);
  const navigationRef = useRef();

  useEffect(() => {
    if (!isAuth) {
      navigationRef.current.resetRoot({
        index: 0,
        routes: [{ name: 'AuthorizationStack' }],
      });
      console.log(navigationRef.current.getRootState())
    }
  }, [isAuth])

  return (
    <NavigationContainer ref={navigationRef} >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Startup" component={Screens.Startup} />
        <Stack.Screen
          name="AuthorizationStack"
          component={AuthorizationStack}
          options={{ title: "Authorization" }}
        />
        <Stack.Screen name="ShopDrawer" component={ShopDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
