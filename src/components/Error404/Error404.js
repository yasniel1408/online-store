import React from "react";
import { Link } from "react-router-dom";

export const Error404 = () => {
  return (
    <div className="w-100 vh-100 d-flex flex-column justify-content-center align-items-center">
      <h1>Error404</h1>
      <h4>UPS!, The page has not been found</h4>
      <br />
      <Link to="/">Back</Link>
    </div>
  );
};
