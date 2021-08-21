import React from "react";
import "./App.css";
import { Products } from "./page/Products/Products";
import { Nav } from "./components/Nav/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Error404 } from "./components/Error404/Error404";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/">
            <Products />
          </Route>
          <Route>
            <Error404 />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
