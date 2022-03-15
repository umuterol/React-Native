const initialState = {
  items: {},
  totalAmount: 0,
};

import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/orders";
import { DELETE_USER_PRODUCT } from "../actions/products";
import CartItem from "../../models/cart-item";

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const id = action.product.id;
      const price = action.product.price;
      const title = action.product.title;
      let updatedOrNewCardItem;

      if (state.items[id]) {
        updatedOrNewCardItem = new CartItem(
          state.items[id].quantity + 1,
          price,
          title,
          Number((state.items[id].sum + price).toFixed(2))
        );
      } else {
        updatedOrNewCardItem = new CartItem(1, price, title, price);
      }
      return {
        items: { ...state.items, [id]: updatedOrNewCardItem },
        totalAmount: Number((state.totalAmount + price).toFixed(2)),
      };
    case REMOVE_FROM_CART:
      const items = { ...state.items };
      const updatedTotalAmount = Number(
        (state.totalAmount - state.items[action.productId].sum).toFixed(2)
      );
      console.log(state.totalAmount, state.items[action.productId].sum);
      delete items[action.productId];
      return {
        ...state,
        items: { ...items },
        totalAmount: updatedTotalAmount,
      };
    case ADD_ORDER:
      return initialState;
    case DELETE_USER_PRODUCT:
      if (state.items[action.productId]) {
        const deletedItems = { ...state.items };
        const updatedTotalAmount = Number(
          (state.totalAmount - state.items[action.productId].sum).toFixed(2)
        );
        delete deletedItems[action.productId];
        return {
          items: deletedItems,
          totalAmount: updatedTotalAmount,
        };
      }
    default:
      return state;
  }
};
