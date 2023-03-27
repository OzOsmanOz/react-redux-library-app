import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import api from "../Api/api";
import urls from "../Api/urls";
import actionTypes from "../redux/actions/actionTypes";
import Loading from "./Loading";
import Modal from "./Modal";

const ListBook = () => {
  const dispatch = useDispatch();
  const { categoriesState } = useSelector((state) => state);
  const [books, setBooks] = useState(null);
  const [didUpdate, setDidUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deletedBookId, setDeletedBookId] = useState("");
  const [deletedBookName, setDeletedBookName] = useState("");

  useEffect(() => {
    dispatch({ type: actionTypes.booksActions.FETCH_BOOKS_START });
    api
      .get(urls.books)
      .then((res) => {
        dispatch({
          type: actionTypes.booksActions.FETCH_BOOKS_SUCCESS,
          payload: res.data,
        });
        setBooks(res.data);
      })
      .catch((err) => {
        console.log("books get err", err);
        dispatch({
          type: actionTypes.booksActions.FETCH_BOOKS_FAIL,
          payload: "server hatası",
        });
      });
  }, [didUpdate]);

  const handleDelete = (id) => {
    dispatch({ type: actionTypes.booksActions.FETCH_BOOKS_START });
    api
      .delete(`${urls.books}/${id}`)
      .then((res) => {
        dispatch({
          type: actionTypes.booksActions.FETCH_BOOKS_SUCCESS,
          payload: res.data,
        });
        setDidUpdate(!didUpdate);
      })
      .catch((err) => {
        console.log("books delete err", err);
        dispatch({
          type: actionTypes.booksActions.FETCH_BOOKS_FAIL,
          payload: "server hatası",
        });
      });
  };

  if (!books || !categoriesState.categories) return <Loading />;

  return (
    <div>
      <div className="container my-5">
        <div className="d-flex justify-content-end mb-4">
          <Link
            to={"/add-book"}
            className="btn btn-sm btn-success fw-semibold py-0"
            style={{
              backgroundColor: "#408E91",
            }}
          >
            Add Book
          </Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Book Name</th>
              <th className="text-center">Author</th>
              <th className="text-center">Categories</th>
              <th className="text-center">Isbn</th>
              <th className="text-center">Process</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => {
              const findCategory = categoriesState.categories.find(
                (cat) => cat.id === book.categoryId
              );
              return (
                <tr key={book.id}>
                  <td>{book.name}</td>
                  <td className="text-center">{book.author}</td>
                  <td className="text-center">{findCategory.name}</td>
                  <td className="text-center">{book.isbn}</td>
                  <td className="text-center">
                    <button
                      onClick={() => {
                        // handleDelete(book.id);
                        setShowModal(true);
                        setDeletedBookId(book.id);
                        setDeletedBookName(book.name);
                      }}
                      className="btn btn-sm py-0 text-white"
                      style={{ backgroundColor: "#E49393" }}
                    >
                      <i className="fa-solid fa-trash "></i>
                    </button>
                    <Link
                      to={`/edit-book/${book.id}`}
                      className="btn btn-sm py-0 ms-2 text-white"
                      style={{ backgroundColor: "#4AA3BA" }}
                    >
                      <i className="fa-solid fa-edit"></i>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {showModal && (
          <Modal
            onCancel={() => setShowModal(false)}
            onConfirm={() => handleDelete(deletedBookId)}
            title={deletedBookName}
            explanation="Are you sure you want to delete the book?"
          />
        )}
      </div>
    </div>
  );
};

export default ListBook;
