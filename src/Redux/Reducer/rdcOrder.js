import { GET_ORDERS, GET_ORDER_BY_ID } from "../Action/actOrder";

const initialState = {
    orders: [],
    orderDetails: [],
  };

  export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ORDERS:
        return {
          ...state,
          orders: action.payload,
        };
      case GET_ORDER_BY_ID:
        return {
          ...state,
          orderDetails: action.payload,
        };
      default:
        return state;
    }
  };