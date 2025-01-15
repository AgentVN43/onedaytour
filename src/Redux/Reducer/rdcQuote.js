import {
    CREATE_QUOTE,
    UPDATE_QUOTE,
    POST_QUOTE,
    POST_QUOTE_SUCCESS,
    POST_QUOTE_FAILURE,
  } from "../Action/actQuote";
  
  // Initial State
  const initialState = {
    quote: null,
    loading: false,
    error: null,
  };
  
  // Reducer
  const quoteReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_QUOTE:
        return {
          ...state,
          quote: action.payload,
        };
      case UPDATE_QUOTE:
        return {
          ...state,
          quote: {
            ...state.quote,
            ...action.payload,
          },
        };
      case POST_QUOTE:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case POST_QUOTE_SUCCESS:
        return {
          ...state,
          loading: false,
          quote: action.payload,
        };
      case POST_QUOTE_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default quoteReducer;
  