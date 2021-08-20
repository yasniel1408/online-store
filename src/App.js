import React from "react";
import { useState } from "react";
import "./App.css";
import { DataForm } from "./components/DataForm/DataForm";
import { DataTable } from "./components/DataTable/DataTable";
import { Nav } from "./components/Nav/Nav";

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="App">
      <Nav />
      <DataTable handleShow={handleShow} />
      <DataForm show={show} handleClose={handleClose} />
    </div>
  );
}

export default App;
