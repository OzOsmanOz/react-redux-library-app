import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AddBookForm = () => {
  const { booksState, categoriesState } = useSelector((state) => state);
  const handleAddBook = () => {};
  return (
    <div className="container">
      <form onSubmit={handleAddBook} className="row g-3 my-5">
        <h4 className="text-center fw-semibold">Add Book</h4>
        <div className="col-6">
          <input
            type="text"
            className="form-control fs-6"
            placeholder="Name"
            aria-label="Name"
          />
        </div>
        <div className="col-6">
          <input
            type="text"
            className="form-control fs-6"
            placeholder="Author"
            aria-label="Author"
          />
        </div>

        <div className="col-6">
          <input
            type="text"
            className="form-control fs-6"
            placeholder="Isbn"
            aria-label="Isbn"
          />
        </div>
        <div className="col-6">
          <select className="form-select" aria-label="Default select example">
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
