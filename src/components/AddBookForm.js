import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import api from "../Api/api";
import urls from "../Api/urls";
import actionTypes from "../redux/actions/actionTypes";
import Loading from "./Loading";

const AddBookForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { booksState, categoriesState } = useSelector((state) => state);
  const [booksForm, setBooksForm] = useState({
    id: String(new Date().getTime()),
    name: "",
    author: "",
    categoryId: "",
    isbn: "",
  });

  console.log("booksState", booksState);
  console.log("booksForm", booksForm);

  const handleAddBook = (e) => {
    e.preventDefault();

    dispatch({ type: actionTypes.booksActions.FETCH_BOOKS_START });
    api
      .post(urls.books, booksForm)
      .then((res) => {
        dispatch({
          type: actionTypes.booksActions.FETCH_BOOKS_SUCCESS,
          payload: booksForm,
        });
        navigate("/");
      })
      .catch((err) => {
        console.log("books post err", err);
        dispatch({
          type: actionTypes.booksActions.FETCH_BOOKS_FAIL,
          payload: "server hatası",
        });
      });
  };

  if (booksState.success !== true || categoriesState.success !== true)
    return <Loading />;

  return (
    <div className="container">
      <form onSubmit={handleAddBook} className="row g-3 my-5">
        <h4 className="text-center fw-semibold">Add Book</h4>
        <div className="col-6">
          <input
            onChange={(e) =>
              setBooksForm({ ...booksForm, name: e.target.value })
            }
            value={booksForm.name}
            type="text"
            className="form-control fs-6"
            placeholder="Name"
            aria-label="Name"
          />
        </div>
        <div className="col-6">
          <input
            onChange={(e) =>
              setBooksForm({ ...booksForm, author: e.target.value })
            }
            value={booksForm.author}
            type="text"
            className="form-control fs-6"
            placeholder="Author"
            aria-label="Author"
          />
        </div>

        <div className="col-6">
          <input
            onChange={(e) =>
              setBooksForm({ ...booksForm, isbn: e.target.value })
            }
            value={booksForm.isbn}
            type="text"
            className="form-control fs-6"
            placeholder="Isbn"
            aria-label="Isbn"
          />
        </div>
        <div className="col-6">
          <select
            onChange={(e) =>
              setBooksForm({ ...booksForm, categoryId: e.target.value })
            }
            className="form-select"
            aria-label="Default select example"
          >
            <option value="">
              <select>Choose category</select>
            </option>
            {categoriesState.categories.map((cat) => {
              return (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="d-flex justify-content-center">
          <div className="d-flex justify-content-center w-50">
            <button
              type="submit"
              className="btn btn-sm btn-outline-success fw-semibold me-3 w-50"
            >
              Add
            </button>
            <Link
              to={"/"}
              className="btn btn-sm btn-outline-secondary fw-semibold w-50"
            >
              Close
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;
