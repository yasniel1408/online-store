import React from "react";
import reducers from "./redux/reducers";
import thunk from "redux-thunk";
import Adapter from "enzyme-adapter-react-16";
import { applyMiddleware, createStore } from "redux";
import { Products } from "./page/Products/Products";
import { configure, shallow } from "enzyme";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);
configure({ adapter: new Adapter() });

const ReduxProvider = ({ children, reduxStore }) => (
  <Provider store={reduxStore}>{children}</Provider>
);

describe("Products", () => {
  it("list Product", () => {
    const wrapper = shallow(
      ReduxProvider({ children: <Products />, reduxStore: store })
    );
    expect(wrapper.)
    // const tree = renderer.create(wrapper).toJSON();
    // expect(tree).toMatchSnapshot();
  });
});
