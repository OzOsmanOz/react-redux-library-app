import { createStore, combineReducers } from "redux";
import booksReducer from "./reducer/booksReducer";

import categoriesReducer from "./reducer/categoriesReducer";

const rootReducer = combineReducers({
  categoriesState: categoriesReducer,
  booksState: booksReducer,
});

const store = createStore(rootReducer);

export default store;
