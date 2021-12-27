import React, { useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Button, Image, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../store/action/meals";
import { showMessage } from "react-native-flash-message";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';

const List = props => <View style={styles.list}>
  {
    props.data.map(item => (
      <View key={item} style={styles.listItem}><DefaultText>{props.span + " " + item}</DefaultText></View>
    ))
  }
</View>


const MealDetailScreen = (props) => {
  const dispatch = useDispatch();
  const mealId = props.navigation.getParam('mealId');
  const Meals = useSelector(state => state.meal.meal);
  const selectedMeal = Meals.find(meal => meal.id === mealId);
  const currentMealIsFavorite = useSelector(state =>
    state.meal.favoriteMeal.some(meal => meal.id === mealId)
  );



  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId])


  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler })
  }, [toggleFavoriteHandler])

  useEffect(() => {
    props.navigation.setParams({ isFav: currentMealIsFavorite })
  }, [currentMealIsFavorite])

  return <ScrollView>
    <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
    <View style={styles.info}>
      <DefaultText>{selectedMeal.duration}m</DefaultText>
      <DefaultText color={selectedMeal.getComlexity().color}>{selectedMeal.getComlexity().value.toUpperCase()}</DefaultText>
      <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
    </View>
    <View style={styles.detail}>
      <Text style={styles.title}>Ingredients</Text>
      <List data={selectedMeal.ingredients} span={'-'} />
    </View>
    <View style={styles.detail}>
      <Text style={styles.title}>Steps</Text>
      <List data={selectedMeal.steps} span={'*'} />
    </View>
  </ScrollView>
};

MealDetailScreen.navigationOptions = (navigationData) => {
  const mealTitle = navigationData.navigation.getParam('mealTitle');
  const toggleFav = navigationData.navigation.getParam('toggleFav');
  const isFav = navigationData.navigation.getParam('isFav');
  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName={isFav ? "ios-star" : "ios-star-outline"}
          onPress={() => {
            if (!isFav)
              showMessage({
                message: 'marked as favorite',
                type: 'success',
              });
            else showMessage({
              message: 'removed from favorites',
              type: 'danger',
            })
            toggleFav();
          }}
        />
      </HeaderButtons>
      // <TouchableOpacity>
      //   <View style={{ width: '100%', height: '100%' , justifyContent:'center', marginRight:10 }}>
      //     <Ionicons name="ios-star-outline" color="white" size={23} />
      //   </View>
      // </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  info: {
    flexDirection: 'row',
    fontFamily: 'open-sans',
    justifyContent: 'space-around',
    marginVertical: 5,
  },
  title: {
    fontFamily: 'open-sans-bold',
    textAlign: 'center',
    fontSize: 17,
  },
  detail: {
    marginVertical: 5,
    marginHorizontal: 10,
  },
  list: {
    margin: 5,
  }
});

export default MealDetailScreen;
