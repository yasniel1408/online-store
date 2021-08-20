import axios from "axios";
import { ActionTypes } from ".";

export const categoryFetch = () => ({
  type: ActionTypes.CATEGORY_FETCH,
});

export const categorySuccess = (data) => ({
  type: ActionTypes.CATEGORY_SUCCESS,
  payload: data,
});

export const categoryError = (error) => ({
  type: ActionTypes.CATEGORY_ERROR,
  payload: error,
});

export const getCategoryById = (id) => {
  return async (dispatch) => {
    dispatch(categoryFetch());
    try {
      const response = await axios(`/category?department=${id}`);
      if (response.data) {
        dispatch(categorySuccess(response.data));
        return true;
      }
      return false;
    } catch (error) {
      dispatch(categoryError(error));
    }
  };
};
