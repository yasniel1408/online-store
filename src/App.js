import React from "react";
import "./App.css";
import { Products } from "./components/Products/Products";
import { Nav } from "./components/Nav/Nav";

function App() {
  return (
    <div className="App">
      <Nav />
      <Products />
    </div>
  );
}

export default App;
