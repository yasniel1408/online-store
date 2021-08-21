import axios from "axios";
import { ActionTypes } from ".";

export const productFetch = () => ({
  type: ActionTypes.PRODUCT_FETCH,
});

export const productSuccess = (data) => ({
  type: ActionTypes.PRODUCT_SUCCESS,
  payload: data,
});

export const productError = (error) => ({
  type: ActionTypes.PRODUCT_ERROR,
  payload: error,
});

export const productDelete = (id) => ({
  type: ActionTypes.PRODUCT_DELETE,
  payload: id,
});

export const productStopFetch = () => ({
  type: ActionTypes.PRODUCT_STOP_FETCH,
});

export const getAllProducts = ({ page, q }) => {
  return async (dispatch) => {
    dispatch(productFetch());
    try {
      const response = await axios(`/product?_page=${page}&_limit=5&q=${q}`);
      if (response.data) {
        dispatch(productSuccess(response.data));
        return response.headers["x-total-count"];
      }
    } catch (error) {
      dispatch(productError(error));
    }
  };
};

export const addProduct = (data) => {
  return async (dispatch) => {
    dispatch(productFetch());
    try {
      const response = await axios.post("/product", data);
      if (response.status === 201) {
        dispatch(productStopFetch());
      }
    } catch (error) {
      dispatch(productError(error));
    }
  };
};

export const deleteProductById = (id) => {
  return async (dispatch) => {
    try {
      dispatch(productFetch());
      const response = await axios.delete(`/product/${id}`);
      if (response.status === 200) {
        dispatch(productDelete(id));
        return true;
      }
      return false;
    } catch (error) {
      dispatch(productError(error));
    }
  };
};

export const editProductById = (id, data) => {
  return async (dispatch) => {
    try {
      dispatch(productFetch());
      const response = await axios.put(`/product/${id}`, data);
      if (response.status === 200) {
        dispatch(productStopFetch());
        return true;
      }
      return false;
    } catch (error) {
      dispatch(productError(error));
    }
  };
};
