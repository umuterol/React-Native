import { ADD_ORDER, SET_ORDERS } from "../actions/orders";
import Order from "../../models/order";

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        orders: action.orders,
      };
    case ADD_ORDER:
      const newOrderData = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.totalAmount,
        action.date
      );
      return {
        orders: state.orders.concat(newOrderData),
      };
  }
  return state;
};
