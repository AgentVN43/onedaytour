import { orderService } from "../../services/orderService";

export const GET_ORDERS = "GET_ORDERS";
export const GET_ORDER_BY_ID = "GETS_ORDER_BY_ID";

// Action Creators
export const fetchOrders = () => async (dispatch) => {
    try {
      const res = await orderService.getAll();
      if (res && res.data) {
        dispatch({
          type: GET_ORDERS,
          payload: res.data,
        });
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  
  export const fetchOrderById = (orderId) => async (dispatch) => {
    try {
      const res = await orderService.getById(orderId);
      if (res && res.data) {
        dispatch({
          type: GET_ORDER_BY_ID,
          payload: res.data,
        });
      }
    } catch (error) {
      console.error(`Error fetching order with ID ${orderId}:`, error);
    }
  };