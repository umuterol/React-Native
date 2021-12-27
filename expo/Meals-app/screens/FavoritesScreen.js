import React from "react";
import MealList from "../components/MealList";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { useSelector } from "react-redux";
import { View } from "react-native";
import DefaultText from "../components/DefaultText";

const FavoritesScreen = props => {
    const favMeals = useSelector(state => state.meal.favoriteMeal);

    if (favMeals.length === 0 || !favMeals) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <DefaultText>No favorite meals found. Start adding some!</DefaultText>
        </View>
    }

    return <MealList data={favMeals} navigation={props.navigation} />

}

FavoritesScreen.navigationOptions = (navData) => {
    return {
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="menu"
                iconName="ios-menu"
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }}
            />
        </HeaderButtons>
    }
}

export default FavoritesScreen;