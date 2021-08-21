import React from "react";
import { Provider } from "react-redux";
import { render, cleanup } from "@testing-library/react";
import { createStore } from "redux";
import { Products } from "../components/Products/Products";
import { ActionTypes } from "../redux/actions";

afterEach(cleanup);

const initialState = {
  loading: false,
  error: "",
  products: [
    {
      id: 1,
      name: "Bluza",
      cost: "454",
      department: "Ropa",
      category: "Ropa de mujer",
    },
    {
      id: 2,
      name: "pulover",
      cost: "44",
      department: "Ropa",
      category: "Ropa de hombre",
    },
  ],
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
    default:
      return state;
  }
};

function renderWithRedux(component) {
  const store = createStore(productReducer);
  return {
    ...render(<Provider store={store}>{component}</Provider>),
  };
}

describe("Products", () => {
  it("list Product", async () => {
    const { getByTestId, getByTest } = renderWithRedux(<Products />);
    expect(getByTestId("btn-add")).toHaveTextContent("Add Product");
  });
});
