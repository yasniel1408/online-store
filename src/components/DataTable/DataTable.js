import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container, Table } from "react-bootstrap";
import { PlusIcon, PencilIcon, TrashIcon } from "@primer/octicons-react";
import { getAllProducts } from "../../redux/actions/productActions";
import { AlertMessage } from "../AlertMessage/AlertMessage";
import { Loading } from "../Loading/Loading";

export const DataTable = ({ handleShow }) => {
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector(
    (state) => state.productReducer
  );

  useEffect(() => {
    const load = async () => {
      dispatch(getAllProducts());
    };
    load();
  }, []);
  return (
    <Container>
      <div className="w-100 d-flex ">
        <Button variant="success" className="mt-3" onClick={handleShow}>
          <PlusIcon />
          Add Product
        </Button>
      </div>

      {error && <AlertMessage variant={"danger"} message={error.message} />}

      {loading ? (
        <Loading />
      ) : (
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Cost</th>
              <th>Department</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((d) => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>{d.cost}</td>
                <td>{d.department}</td>
                <td>{d.category}</td>
                <td>
                  <Button>
                    <PencilIcon /> Edit
                  </Button>
                  <i className="m-1" />
                  <Button variant="danger">
                    <TrashIcon /> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

DataTable.propTypes = {
  handleShow: PropTypes.func,
};
