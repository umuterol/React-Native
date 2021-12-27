import { MEALS } from '../../data/dummy-data';
import { TOGGLE_FAVORITE, FILTER_MEALS, filterMeals } from '../action/meals';

const initialState = {
    meal: MEALS,
    filteredMeal: MEALS,
    favoriteMeal: [],
}

const mealReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FAVORITE:
            const existingIndex = state.favoriteMeal.findIndex(meal => meal.id === action.mealId);
            if (existingIndex >= 0) {
                const updateFavMeals = [...state.favoriteMeal];
                updateFavMeals.splice(existingIndex, 1);
                return { ...state, favoriteMeal: updateFavMeals };
            } else {
                const favMeal = state.meal.find(meal => meal.id === action.mealId);
                return { ...state, favoriteMeal: state.favoriteMeal.concat(favMeal) };
            }
        case FILTER_MEALS:
            const appliedFilters = action.filters;
            const filteredMeals = state.meal.filter(meal => {
                if (appliedFilters.isGlutenFree && !meal.isGlutenFree) return false;
                if (appliedFilters.isLactoseFree && !meal.isLactoseFree) return false;
                if (appliedFilters.isVegetarian && !meal.isVegetarian) return false;
                if (appliedFilters.isVegan && !meal.isVegan) return false;
                return true;
            })
            // let filteredMeals = [...state.meal];
            // if (action.filters.isGlutenFree)
            //     filteredMeals = filteredMeals.filter(meal => {
            //         return meal.isGlutenFree
            //     });
            // if (action.filters.isLactoseFree)
            //     filteredMeals = filteredMeals.filter(meal => {
            //         return meal.isLactoseFree
            //     });
            // if (action.filters.isVegan)
            //     filteredMeals = filteredMeals.filter(meal => {
            //         return meal.isVegan
            //     });
            // if (action.filters.isVegetarian)
            //     filteredMeals = filteredMeals.filter(meal => {
            //         return meal.isVegetarian
            //     });
            return { ...state, filteredMeal: filteredMeals };
        default:
            return state;
    }
}

export default mealReducer;