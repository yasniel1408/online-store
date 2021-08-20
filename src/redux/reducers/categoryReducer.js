import { ActionTypes } from "../actions";

const initialState = {
  loadingCategory: false,
  errorCategory: "",
  categories: [],
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CATEGORY_FETCH: {
      return {
        ...state,
        loadingCategory: true,
      };
    }
    case ActionTypes.CATEGORY_SUCCESS: {
      return {
        ...state,
        categories: action.payload,
        loadingCategory: false,
      };
    }
    case ActionTypes.CATEGORY_ERROR: {
      return {
        ...state,
        errorCategory: action.payload,
        loadingCategory: false,
      };
    }
    default:
      return state;
  }
};

export default categoryReducer;
