import React, { useState } from "react";
import PropTypes from "prop-types";
import { SearchIcon } from "@primer/octicons-react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";

export const DataSearch = ({ load, setPage }) => {
  const [q, setQ] = useState("");

  const serach = (e) => {
    setQ(e.target.value);
    setPage(1);
    load(q);
  };

  const submitSerach = (e) => {
    e.preventDefault();
    serach(e);
  };
  return (
    <Form onSubmit={submitSerach} className="mt-3 mr-3">
      <InputGroup value={q} onKeyUp={(e) => serach(e)}>
        <FormControl placeholder="Search..." aria-describedby="basic-addon2" />
        <Button variant="outline-secondary" type="submit" id="button-addon2">
          <SearchIcon />
        </Button>
      </InputGroup>
    </Form>
  );
};

DataSearch.propTypes = {
  load: PropTypes.func,
  setPage: PropTypes.func,
};
