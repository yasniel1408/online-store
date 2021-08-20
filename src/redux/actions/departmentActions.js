import axios from "axios";
import { ActionTypes } from ".";

export const departmentFetch = () => ({
  type: ActionTypes.DEPARTMENT_FETCH,
});

export const departmentSuccess = (data) => ({
  type: ActionTypes.DEPARTMENT_SUCCESS,
  payload: data,
});

export const departmentError = (error) => ({
  type: ActionTypes.DEPARTMENT_ERROR,
  payload: error,
});

export const getAllDepartment = () => {
  return async (dispatch) => {
    dispatch(departmentFetch());
    try {
      const response = await axios("/department");
      if (response.data) {
        dispatch(departmentSuccess(response.data));
        return true;
      }
      return false;
    } catch (error) {
      dispatch(departmentError(error));
    }
  };
};
