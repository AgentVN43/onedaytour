// Action Types
export const CREATE_QUOTE = "CREATE_QUOTE";
export const UPDATE_QUOTE = "UPDATE_QUOTE";
export const POST_QUOTE = "POST_QUOTE";
export const POST_QUOTE_SUCCESS = "POST_QUOTE_SUCCESS";
export const POST_QUOTE_FAILURE = "POST_QUOTE_FAILURE";

// Action Creators
export const createQuote = (quote) => ({
  type: CREATE_QUOTE,
  payload: quote,
});

export const updateQuote = (quote) => ({
  type: UPDATE_QUOTE,
  payload: quote,
});

export const postQuote = (quote) => ({
  type: POST_QUOTE,
  payload: quote,
});

export const postQuoteSuccess = (response) => ({
  type: POST_QUOTE_SUCCESS,
  payload: response,
});

export const postQuoteFailure = (error) => ({
  type: POST_QUOTE_FAILURE,
  payload: error,
});
