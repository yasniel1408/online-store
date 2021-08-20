import { combineReducers } from "redux";
import productReducer from "./productReducer";
import categoryReducer from "./categoryReducer";
import departmentReducer from "./departmentReducer";

export default combineReducers({
  productReducer,
  categoryReducer,
  departmentReducer,
});
