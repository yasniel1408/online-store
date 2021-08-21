import React from "react";
import PropTypes from "prop-types";
import { Spinner } from "react-bootstrap";

export const Loading = ({ size }) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        width: size === "sm" ? "auto" : "100%",
      }}
    >
      <Spinner size={size} animation="border" variant="primary" />
    </div>
  );
};

Loading.propTypes = {
  size: PropTypes.string,
};
