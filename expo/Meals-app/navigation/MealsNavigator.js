import React from "react";
import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavoritesScreen from '../screens/FavoritesScreen';
import FilterScreen from '../screens/FiltersScreen';
import FilterMealsScreen from '../screens/FilterMealsScreen';

import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
      navigationOptions: {
        headerTitle: "Meal Categories",
      }
    },
    CategoryMeals: {
      screen: CategoryMealsScreen,
    },
    MealDetail: MealDetailScreen,
    FilterMeals: { screen: FilterMealsScreen, navigationOptions: { headerTitle: 'Meals for You' } },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.primaryColor,
      },
      headerTitleStyle: {
        fontFamily: 'open-sans-bold'
      },
      headerBackTitleStyle: {
        //Ios
        fontFamily: 'open-sans-bold'
      },
      headerTintColor: "white",
    },
    // mode:'modal'
    // initialRouteName:'MealDetail',
  }
);

const favNavigator = createStackNavigator({
  Favorites: {
    screen: FavoritesScreen,
    navigationOptions: {
      headerTitle: 'Your Favorites'
    }
  },
  MealDetail: MealDetailScreen,
},
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.primaryColor,
      },
      headerTitleStyle: {
        fontFamily: 'open-sans-bold'
      },
      headerBackTitleStyle: {
        //Ios
        fontFamily: 'open-sans-bold'
      },
      headerTintColor: 'white',
    }
  }
)



let MealsFavTabNavigator;
if (Platform.OS === 'android')
  MealsFavTabNavigator = createMaterialBottomTabNavigator(
    {
      AllMeals: {
        screen: MealsNavigator,
        navigationOptions: {
          tabBarLabel: 'All Meals',
          tabBarIcon: (tabInfo) => {
            return <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
          },
          tabBarColor: Colors.primaryColor,
        }
      },
      Favorites: {
        screen: favNavigator,
        navigationOptions: {
          tabBarIcon: (tabInfo) => {
            return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />
          },
          tabBarColor: Colors.secondaryColor,
        }
      },
    },
    {
      activeColor: 'white',
      shifting: true,
      barStyle: {
        backgroundColor: Colors.secondaryColor //shifting false durumunda
      },
    }
  )


if (Platform.OS === 'ios')
  MealsFavTabNavigator = createBottomTabNavigator({
    AllMeals: {
      screen: MealsNavigator,
      navigationOptions: {
        tabBarLabel: 'All Meals',
        tabBarIcon: (tabInfo) => {
          return <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
        },
      }
    },
    Favorites: {
      screen: favNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />
        },
      }
    },
  }
    ,
    {
      tabBarOptions: {
        activeTintColor: Colors.secondaryColor,
        labelStyle: {
          // fontFamily: 'open-sans-bold',
          // fontWeight: "bold",
        },
      },
      // initialRouteName:'Favorites',
    },
  )

const FilterNavigator = createStackNavigator({
  Filters: {
    screen: FilterScreen,
  },
},
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.primaryColor,
      },
      headerTitleStyle: {
        fontFamily: 'open-sans-bold'
      },
      headerBackTitleStyle: {
        //Ios
        fontFamily: 'open-sans-bold'
      },
      headerTintColor: 'white'
    }
  }
)

const MainDrawerNavigator = createDrawerNavigator(
  {
    MealsFav: {
      screen: MealsFavTabNavigator,
      navigationOptions: {
        drawerLabel: 'Meals',
        drawerIcon: (tabInfo) => <Ionicons name="ios-home" size={25} color={tabInfo.tintColor} />

      }
    },
    Filters: {
      screen: FilterNavigator,
      navigationOptions: {
        drawerIcon: (tabInfo) => <Ionicons name="ios-filter" size={25} color={tabInfo.tintColor} />
      }

    },
  }
  ,
  {
    contentOptions: {
      activeTintColor: Colors.secondaryColor,
      itemsContainerStyle: {
        marginTop: 25,
      },
    },
    hideStatusBar: true, //drawer açıldığında durum çubuğu gizlenir
    statusBarAnimation: 'slide',
  }
)

export default createAppContainer(MainDrawerNavigator);
