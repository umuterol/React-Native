import React from "react";
import { MEALS } from "../data/dummy-data";
import MealList from "../components/MealList";

const FilterMealsScreen = (props) => {
    const filter = props.navigation.getParam('filter');
    let displayedMeals=MEALS;

    if(filter.isGlutenFree)
    displayedMeals = displayedMeals.filter(meal => {
        return meal.isGlutenFree === filter.isGlutenFree;
    });
    if(filter.isLactoseFree)
    displayedMeals = displayedMeals.filter(meal => {
        return meal.isLactoseFree === filter.isLactoseFree;
    });
    if(filter.isVegan)
    displayedMeals = displayedMeals.filter(meal => {
        return meal.isVegan === filter.isVegan;
    });
    if(filter.isVegetarian)
    displayedMeals = displayedMeals.filter(meal => {
        return meal.isVegetarian === filter.isVegetarian;
    });

    return <MealList data={displayedMeals} navigation={props.navigation} />;
};



export default FilterMealsScreen;
