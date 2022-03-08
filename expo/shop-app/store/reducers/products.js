import { DELETE_USER_PRODUCT } from '../actions/products'
import PRODUCTS from "../../data/dummy-data";


const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(pro => pro.ownerId === 'u1'),
}

export default (state = initialState, action) => {
    switch (action.type) {
        case DELETE_USER_PRODUCT:
            return {
                userProducts: state.userProducts.filter(prod => prod.id !== action.productId),
                availableProducts: state.availableProducts.filter(prod => prod.id !== action.productId)
            }
    }
    return state;
}