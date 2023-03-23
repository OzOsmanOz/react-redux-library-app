import React from "react";

const Loading = () => {
  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <div className="row d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary " role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div>
          <p className="text-center my-3">Loading</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
