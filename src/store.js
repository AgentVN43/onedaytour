import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { orderReducer } from "./Redux/Reducer/rdcOrder";

const rootReducer = combineReducers({
  order: orderReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
