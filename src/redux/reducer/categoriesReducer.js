import actionTypes from "../actions/actionTypes";

const initialState = {
  start: false,
  success: false,
  categories: [],
  fail: false,
  error: "",
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.categoriesActions.FETCH_CATEGORIES_START:
      return {
        ...state,
        start: true,
      };

    case actionTypes.categoriesActions.FETCH_CATEGORIES_SUCCESS:
      return {
        ...initialState,
        success: true,
        categories: action.payload,
      };

    case actionTypes.categoriesActions.FETCH_CATEGORIES_FAIL:
      return {
        ...initialState,
        fail: true,
        error: action.payload,
      };

    default:
      return state;
  }
};
export default categoriesReducer;
