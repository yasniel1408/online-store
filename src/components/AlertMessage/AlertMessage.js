import React from "react";
import PropTypes from "prop-types";
import { Alert } from "react-bootstrap";

export const AlertMessage = ({ variant, message }) => {
  return <Alert variant={variant}>{message}</Alert>;
};

AlertMessage.propTypes = {
  variant: PropTypes.string,
  message: PropTypes.string,
};
