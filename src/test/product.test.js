import productReducer from "../redux/reducers/productReducer";
import { ActionTypes } from "../redux/actions";

describe("Products", () => {
  it("should return the initial state", () => {
    expect(productReducer(undefined, {})).toEqual({
      loading: false,
      error: "",
      products: [],
    });
  });
  it("should add a list of objects to the state", () => {
    const data = [
      {
        id: 90,
        name: "Bluza",
        cost: "44",
        department: "Ropa",
        category: "Ropa de mujer",
      },
      {
        id: 91,
        name: "Chort",
        cost: "34",
        department: "Ropa",
        category: "Ropa de hombre",
      },
    ];
    const action = {
      type: ActionTypes.PRODUCT_SUCCESS,
      payload: data,
    };
    expect(productReducer(undefined, action)).toEqual({
      loading: false,
      error: "",
      products: data,
    });
  });
});
