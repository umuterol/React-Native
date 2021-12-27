import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { filterMeals } from "../store/action/meals";
import { View, Text, StyleSheet, Switch } from "react-native";
import { showMessage } from "react-native-flash-message";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";

const FilterSwitch = props => {
    return <View style={styles.filtersContainer}>
        <Text>{props.label}</Text>
        <Switch
            trackColor={{ true: Colors.primaryColor, false: '#ccc' }}
            // thumbColor="#ccc"
            value={props.state}
            onValueChange={props.onValueChange}
        />
    </View>
}

const FiltersScreen = props => {
    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);
    const dispatch = useDispatch();

    const saveFilters = useCallback(() => {
        dispatch(filterMeals({
            isGlutenFree,
            isLactoseFree,
            isVegan,
            isVegetarian,
        }))
        showMessage({
            message: 'Your filters have been successfully saved.',
            type: 'success',
        });
    }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian])


    useEffect(() => {
        props.navigation.setParams({ saveFilters });
    }, [saveFilters])

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Restrictions</Text>
            <FilterSwitch label="Gluten-free" state={isGlutenFree} onValueChange={newValue => setIsGlutenFree(newValue)} />
            <FilterSwitch label="Lactose-free" state={isLactoseFree} onValueChange={newValue => setIsLactoseFree(newValue)} />
            <FilterSwitch label="Vegan" state={isVegan} onValueChange={newValue => setIsVegan(newValue)} />
            <FilterSwitch label="Vegetarian" state={isVegetarian} onValueChange={newValue => setIsVegetarian(newValue)} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 10,
    },
    filtersContainer: {
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    }
})

FiltersScreen.navigationOptions = (navData) => {
    return {
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="menu"
                iconName="ios-menu"
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }}
            />
        </HeaderButtons>,
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="save"
                iconName="ios-save"
                onPress={() => {
                    const saveFilters = navData.navigation.getParam('saveFilters');
                    saveFilters();
                }}
            />
        </HeaderButtons>
    }
}

export default FiltersScreen;