import { ActionTypes } from "../actions";

const initialState = {
  loading: false,
  error: "",
  products: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.PRODUCT_FETCH: {
      return {
        ...state,
        loading: true,
      };
    }
    case ActionTypes.PRODUCT_SUCCESS: {
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    }
    case ActionTypes.PRODUCT_ERROR: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    }
    case ActionTypes.PRODUCT_DELETE: {
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
        loading: false,
      };
    }
    case ActionTypes.PRODUCT_STOP_FETCH: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default productReducer;
