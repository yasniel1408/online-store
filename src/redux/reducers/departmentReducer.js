import { ActionTypes } from "../actions";

const initialState = {
  loadingDepartment: false,
  errorDepartment: "",
  departments: [],
};

const departmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.DEPARTMENT_FETCH: {
      return {
        ...state,
        loadingDepartment: true,
      };
    }
    case ActionTypes.DEPARTMENT_SUCCESS: {
      return {
        ...state,
        departments: action.payload,
        loadingDepartment: false,
      };
    }
    case ActionTypes.DEPARTMENT_ERROR: {
      return {
        ...state,
        errorDepartment: action.payload,
        loadingDepartment: false,
      };
    }
    default:
      return state;
  }
};

export default departmentReducer;
