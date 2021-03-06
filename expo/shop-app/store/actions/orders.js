import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    try {
      const response = await fetch(
        `https://shop-app-5f9ab-default-rtdb.firebaseio.com/order/${userId}.json`
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await response.json();
      const loadedOrders = [];
      for (key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        );
      }
      dispatch({
        type: SET_ORDERS,
        orders: loadedOrders,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const addOrder = (cartItems, totalAmount) => {
  const date = new Date();
  return async (dispatch, getState) => {
    const { token,userId } = getState().auth;
    const response = await fetch(
      `https://shop-app-5f9ab-default-rtdb.firebaseio.com/order/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          totalAmount,
          cartItems,
          date: date.toISOString(),
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const resData = await response.json();
    dispatch({
      type: ADD_ORDER,
      orderData: { id: resData.name, items: cartItems, totalAmount, date },
    });
  };
};
