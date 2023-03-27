import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import api from "../Api/api";
import urls from "../Api/urls";
import actionTypes from "../redux/actions/actionTypes";
import Loading from "./Loading";

const AddCategoryForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoriesState } = useSelector((state) => state);
  const [categoryForm, setCategoryForm] = useState({
    id: String(new Date().getTime()),
    name: "",
  });

  const handleAddCategory = (e) => {
    e.preventDefault();

    if (!categoryForm.name) {
      alert("Boş bırakılamaz");
      return;
    }
    const findCategoryName = categoriesState.categories.find(
      (cat) => cat.name.toLowerCase() === categoryForm.name.toLowerCase()
    );
    if (findCategoryName) {
      alert("Bu kategori kayıtlı");
      return;
    }
    dispatch({ type: actionTypes.categoriesActions.FETCH_CATEGORIES_START });
    api
      .post(urls.categories, categoryForm)
      .then((res) => {
        dispatch({
          type: actionTypes.categoriesActions.FETCH_CATEGORIES_SUCCESS,
          payload: categoryForm,
        });
        navigate("/categories");
      })
      .catch((err) => {
        console.log("categories post err", err);
        dispatch({
          type: actionTypes.categoriesActions.FETCH_CATEGORIES_FAIL,
          payload: "server hatası",
        });
      });
  };
  if (categoriesState.success !== true) return <Loading />;
  return (
    <div className="container">
      <form onSubmit={handleAddCategory} className="row g-3 my-5">
        <h4 className="text-center fw-semibold">Add Category</h4>
        <div className="col-12">
          <input
            onChange={(e) =>
              setCategoryForm({ ...categoryForm, name: e.target.value })
            }
            value={categoryForm.name}
            type="text"
            className="form-control fs-6"
            placeholder="Category Name"
            aria-label="Name"
          />
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
              to={"/categories"}
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

export default AddCategoryForm;
