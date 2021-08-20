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

export const getAllProducts = () => {
  return async (dispatch) => {
    dispatch(productFetch());
    try {
      const response = await axios("/product");
      if (response.data) {
        dispatch(productSuccess(response.data));
        return true;
      }
      return false;
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
      console.log(response);
      if (response.data) {
        dispatch(productSuccess(response.data));
        return true;
      }
      return false;
    } catch (error) {
      dispatch(productError(error));
    }
  };
};
