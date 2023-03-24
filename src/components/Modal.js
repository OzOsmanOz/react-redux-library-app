import React from "react";

const Modal = (props) => {
  const { onCancel, onConfirm, title, explanation } = props;
  return (
    <button
      onClick={onCancel}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        cursor: "default",
      }}
      className="d-flex justify-content-center align-items-center"
    >
      <div className="d-flex flex-column justify-content-center align-items-center bg-white w-50 h-25 rounded-2 border">
        <h4>{title}</h4>
        <p>{explanation}</p>
        <div className="d-flex justify-content-center  w-100">
          <button
            onClick={onCancel}
            className="btn btn-sm btn-outline-danger w-25 fw-semibold me-3"
          >
            Close
          </button>
          <button
            onClick={onConfirm}
            className="btn btn-sm btn-outline-success w-25 fw-semibold"
          >
            Accept
          </button>
        </div>
      </div>
    </button>
  );
};

export default Modal;
