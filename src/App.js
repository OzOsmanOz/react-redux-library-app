import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./page/HomePage";
import actionTypes from "./redux/actions/actionTypes";
import api from "./Api/api";
import urls from "./Api/urls";
import AddBookPage from "./page/AddBookPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: actionTypes.booksActions.FETCH_BOOKS_START });
    api
      .get(urls.books)
      .then((res) => {
        dispatch({
          type: actionTypes.booksActions.FETCH_BOOKS_SUCCESS,
          payload: res.data,
        });
        dispatch({
          type: actionTypes.categoriesActions.FETCH_CATEGORIES_START,
        });
        api
          .get(urls.categories)
          .then((res) => {
            dispatch({
              type: actionTypes.categoriesActions.FETCH_CATEGORIES_SUCCESS,
              payload: res.data,
            });
          })
          .catch((err) => {
            console.log("categories err", err);
            dispatch({
              type: actionTypes.categoriesActions.FETCH_CATEGORIES_FAIL,
              payload: "server hatası",
            });
          });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.booksActions.FETCH_BOOKS_FAIL,
          payload: "server hatası",
        });
        console.log("books get err", err);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-book" element={<AddBookPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
