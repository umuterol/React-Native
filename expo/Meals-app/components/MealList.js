import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet, FlatList } from "react-native";
import MealItem from "./MealItem";

const MealList = props => {
    const favoriteMeal = useSelector(state => state.meal.favoriteMeal);

    const renderMealItem = itemData => {
        const isFav = favoriteMeal.some(meal => meal.id === itemData.item.id);
        return <MealItem
            title={itemData.item.title}
            duration={itemData.item.duration}
            complexity={itemData.item.getComlexity()}
            affordability={itemData.item.affordability}
            image={itemData.item.imageUrl}
            onSelect={() => props.navigation.navigate('MealDetail', {
                mealId: itemData.item.id,
                mealTitle: itemData.item.title,
                isFav,
            })}
        />
    }

    return (
        <View style={styles.screen}>
            <FlatList
                numColumns={1}
                style={{ width: '100%' }}
                data={props.data}
                renderItem={renderMealItem} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
    },
});

export default MealList;