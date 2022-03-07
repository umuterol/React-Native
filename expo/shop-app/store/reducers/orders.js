import { ADD_ORDER } from '../actions/orders'
import Order from '../../models/order'

const initialState = {
    orders: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_ORDER:
            const newOrderData = new Order(
                new Date().toString(),
                action.orderData.items,
                action.orderData.totalAmount,
                new Date()
            )
            return {
                orders: state.orders.concat(newOrderData),
            }
    }
    return state;
}