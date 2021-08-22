import React from "react";
import { Alert } from "react-bootstrap";
import PropTypes from "prop-types";

export const AlertMessage = ({ variant, message }) => {
  return <Alert variant={variant}>{message}</Alert>;
};

AlertMessage.propTypes = {
  variant: PropTypes.string,
  message: PropTypes.string,
};
