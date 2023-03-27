import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import api from "../Api/api";
import urls from "../Api/urls";
import actionTypes from "../redux/actions/actionTypes";
import Loading from "./Loading";
import Modal from "./Modal";

const ListCategories = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deletedCategoryId, setDeletedCategoryId] = useState("");
  const [deletedCategoryName, setDeletedCategoryName] = useState("");
  const [didUpdate, setDidUpdate] = useState(false);

  useEffect(() => {
    dispatch({ type: actionTypes.categoriesActions.FETCH_CATEGORIES_START });
    api
      .get(urls.categories)
      .then((res) => {
        dispatch({
          type: actionTypes.categoriesActions.FETCH_CATEGORIES_SUCCESS,
          payload: res.data,
        });
        setCategories(res.data);
      })
      .catch((err) => {
        console.log("categories get err", err);
        dispatch({
          type: actionTypes.categoriesActions.FETCH_CATEGORIES_FAIL,
          payload: "server haatası",
        });
      });
  }, [didUpdate]);

  const handleDelete = (id) => {
    api
      .delete(`${urls.categories}/${id}`)
      .then((res) => {
        setDidUpdate(!didUpdate);
      })
      .catch((err) => {
        console.log("categories delete err", err);
      });
  };

  if (!categories) return <Loading />;

  return (
    <div>
      <div>
        <div className="container my-5">
          <div className="d-flex justify-content-end mb-4">
            <Link
              to={"/add-category"}
              className="btn btn-sm btn-success fw-semibold py-0"
            >
              Add Category
            </Link>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Category Name</th>
                <th className="text-end">Process</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => {
                return (
                  <tr key={cat.id}>
                    <td>{cat.name}</td>
                    <td className="text-end">
                      <button
                        onClick={() => {
                          setShowModal(true);
                          setDeletedCategoryId(cat.id);
                          setDeletedCategoryName(cat.name);
                        }}
                        className="btn btn-sm btn-danger py-0"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                      <Link
                        to={`/edit-category/${cat.id}`}
                        className="btn btn-sm btn-primary py-0 ms-2"
                      >
                        <i className="fa-solid fa-edit"></i>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {showModal === true && (
            <Modal
              onCancel={() => setShowModal(false)}
              onConfirm={() => handleDelete(deletedCategoryId)}
              title={deletedCategoryName}
              explanation="Are you sure you want to delete the category?"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ListCategories;
