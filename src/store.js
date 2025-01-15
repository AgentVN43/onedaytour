import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { orderReducer } from "./Redux/Reducer/rdcOrder";
import quoteReducer from "./Redux/Reducer/rdcQuote";

const rootReducer = combineReducers({
  orderData: orderReducer,
  quoteData: quoteReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
