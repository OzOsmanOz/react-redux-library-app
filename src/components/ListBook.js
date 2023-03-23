import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const ListBook = () => {
  const { booksState, categoriesState } = useSelector((state) => state);

  if (booksState.success !== true || categoriesState.success !== true)
    return <Loading />;

  return (
    <div>
      <div className="container my-5">
        <div className="d-flex justify-content-end mb-4">
          <Link
            to={"/add-book"}
            className="btn btn-sm btn-success fw-semibold py-0"
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
            {booksState.books.map((book) => {
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
                    <button className="btn btn-sm btn-danger py-0">
                      <i className="fa-solid fa-trash"></i>
                    </button>
                    <button className="btn btn-sm btn-primary py-0 ms-2">
                      <i className="fa-solid fa-edit"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListBook;
