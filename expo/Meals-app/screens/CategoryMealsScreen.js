import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";

import { CATEGORIES } from "../data/dummy-data";
import MealList from "../components/MealList";
import DefaultText from "../components/DefaultText";

const CategoryMealsScreen = (props) => {
  const filteredMeal = useSelector(state => state.meal.filteredMeal);

  const categoryId = props.navigation.getParam('categoryId');
  const displayedMeals = filteredMeal.filter(meal => {
    return meal.categoryIds.find(category => category === categoryId);
    //meal.categoryIds.indexOf(categoryId) >= 0
  });

  if (displayedMeals.length === 0) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <DefaultText>No meals found, maybe check your filters?</DefaultText>
    </View>
  }

  return <MealList data={displayedMeals} navigation={props.navigation} />;
};

CategoryMealsScreen.navigationOptions = (navigationData) => {
  const categoryId = navigationData.navigation.getParam("categoryId");
  const selectCategory = CATEGORIES.find(
    (category) => category.id === categoryId
  );
  return {
    headerTitle: selectCategory.title,
  };
};


export default CategoryMealsScreen;
