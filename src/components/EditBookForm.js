import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../Api/api";
import urls from "../Api/urls";
import actionTypes from "../redux/actions/actionTypes";
import Loading from "./Loading";

const EditBookForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { categoriesState } = useSelector((state) => state);
  const [editBookForm, setEditBookForm] = useState({
    id: params.bookId,
    name: "",
    author: "",
    isbn: "",
    categoryId: "",
  });

  useEffect(() => {
    api
      .get(urls.books)
      .then((res) => {
        const findEditBook = res.data.find((book) => book.id === params.bookId);
        setEditBookForm(findEditBook);
      })
      .catch((err) => {
        console.log("editBook get err", err);
      });

    setEditBookForm({
      id: params.bookId,
      name: editBookForm.name,
      author: editBookForm.author,
      isbn: editBookForm.isbn,
      categoryId: editBookForm.categoryId,
    });
  }, []);

  const handleEditBook = (e) => {
    e.preventDefault();

    if (
      !editBookForm.name ||
      !editBookForm.author ||
      !editBookForm.categoryId
    ) {
      alert("kitap adı , yazar adı ve kategori boş olamaz");
      return;
    }

    const editBook = {
      id: params.bookId,
      name: editBookForm.name,
      author: editBookForm.author,
      isbn: editBookForm.isbn,
      categoryId: editBookForm.categoryId,
    };

    dispatch({ type: actionTypes.booksActions.FETCH_BOOKS_START });
    api
      .put(`${urls.books}/${params.bookId}`, editBook)
      .then((res) => {
        dispatch({
          type: actionTypes.booksActions.FETCH_BOOKS_SUCCESS,
          payload: editBook,
        });
        navigate("/");
      })
      .catch((err) => {
        console.log("editBook put err", err);
        dispatch({
          type: actionTypes.booksActions.FETCH_BOOKS_FAIL,
          payload: "server hatası",
        });
      });
  };

  //   if (booksState.success !== true || !categoriesState.categories)
  //     return <Loading />;

  if (!editBookForm || !categoriesState?.categories) return <Loading />;

  return (
    <div className="container">
      <form onSubmit={handleEditBook} className="row g-3 my-5">
        <h4 className="text-center fw-semibold">Edit Book</h4>
        <div className="col-6">
          <input
            onChange={(e) =>
              setEditBookForm({ ...editBookForm, name: e.target.value })
            }
            value={editBookForm.name}
            type="text"
            className="form-control fs-6"
            placeholder="Name"
            aria-label="Name"
          />
        </div>
        <div className="col-6">
          <input
            onChange={(e) =>
              setEditBookForm({ ...editBookForm, author: e.target.value })
            }
            value={editBookForm.author}
            type="text"
            className="form-control fs-6"
            placeholder="Author"
            aria-label="Author"
          />
        </div>

        <div className="col-6">
          <input
            onChange={(e) =>
              setEditBookForm({ ...editBookForm, isbn: e.target.value })
            }
            value={editBookForm.isbn}
            type="text"
            className="form-control fs-6"
            placeholder="Isbn"
            aria-label="Isbn"
          />
        </div>
        <div className="col-6">
          <select
            onChange={(e) =>
              setEditBookForm({ ...editBookForm, categoryId: e.target.value })
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
              Save
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

export default EditBookForm;
