export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const FILTER_MEALS = 'FILTER_MEALS';

export const toggleFavorite = (mealId) => {
    return {
        type: TOGGLE_FAVORITE,
        mealId,
    }
}

export const filterMeals = (filter) => {
    return {
        type:FILTER_MEALS,
        filters: filter,
    }
}