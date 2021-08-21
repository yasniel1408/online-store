import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../redux/store";

const TestProvider = ({ store, children }) => (
  <Provider store={store}>{children}</Provider>
);

export function testRender(ui) {
  return render(<TestProvider store={store}>{ui}</TestProvider>);
}
