import actionTypes from "../actions/actionTypes";

const initialState = {
  start: false,
  success: false,
  books: [],
  fail: false,
  error: "",
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.booksActions.FETCH_BOOKS_START:
      return {
        ...state,
        start: true,
      };

    case actionTypes.booksActions.FETCH_BOOKS_SUCCESS:
      return {
        ...initialState,
        success: true,
        books: action.payload,
      };

    case actionTypes.booksActions.FETCH_BOOKS_FAIL:
      return {
        ...initialState,
        fail: true,
        error: action.payload,
      };

    default:
      return state;
  }
};
export default booksReducer;
