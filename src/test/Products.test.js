import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { rest } from "msw";
import { setupServer } from "msw/node";
import productReducer from "../redux/reducers/productReducer";
import { Products } from "../page/Products/Products";

// function render(
//   ui,
//   {
//     preloadedState,
//     store = configureStore({
//       reducer: { user: productReducer },
//       preloadedState,
//     }),
//     ...renderOptions
//   } = {}
// ) {
//   function Wrapper({ children }) {
//     return <Provider store={store}>{children}</Provider>;
//   }
//   return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
// }

// export const handlers = [
//   rest.get("/api/user", (req, res, ctx) => {
//     return res(ctx.json("John Smith"), ctx.delay(150));
//   }),
// ];

// const server = setupServer(...handlers);

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

describe("Products", () => {
  it("should return the initial state", () => {
    expect(productReducer(undefined, {})).toEqual({
      loading: false,
      error: "",
      products: [],
    });
  });
  it("should handle a product being added to an product list", () => {
    const data = {
      name: "Bluza",
      cost: "454",
      department: "Ropa",
      category: "Ropa de mujer",
    };
    render(<Products />);
  });
});
