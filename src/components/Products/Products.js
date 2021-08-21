import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container, Table } from "react-bootstrap";
import { PlusIcon, PencilIcon, TrashIcon } from "@primer/octicons-react";
import {
  deleteProductById,
  getAllProducts,
} from "../../redux/actions/productActions";
import { AlertMessage } from "../AlertMessage/AlertMessage";
import { Loading } from "../Loading/Loading";
import { DataPaginate } from "../DataPaginate/DataPaginate";
import Swal from "sweetalert2";
import { DataForm } from "../DataForm/DataForm";
import { DataSearch } from "../DataSearch/DataSearch";

export const Products = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [editId, setEditId] = useState(null);
  const { products, error, loading } = useSelector(
    (state) => state.productReducer
  );

  useEffect(() => {
    load();
  }, [page]);

  const load = async (q="") => {
    setTotal(parseInt(await dispatch(getAllProducts({ page, q }))));
  };

  const editProduct = async (id) => {
    setShow(true);
    setEditId(id);
  };

  const deleteProduct = async (id) => {
    Swal.queue([
      {
        title: "Delete Product",
        confirmButtonText: "Yes",
        icon: "question",
        showCancelButton: true,
        text: "Are you sure you want to delete the product?",
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          await dispatch(deleteProductById(id));
          load();
          Swal.fire({
            title: "State deleted correctly!",
            text: "The state has been removed.",
            icon: "success",
            showConfirmButton: false,
            timer: 700,
            timerProgressBar: true,
          });
        },
      },
    ]);
  };

  return (
    <Container>
      <DataForm
        handleClose={() => setShow(false)}
        show={show}
        editId={editId}
        setEditId={setEditId}
        load={load}
      />
      <div className="w-100 d-flex justify-content-between">
        <Button
          variant="success"
          className="mt-3"
          data-testid="btn-add"
          onClick={() => setShow(true)}
        >
          <PlusIcon />
          Add Product
        </Button>
        <div className="d-flex flex-row">
          <DataSearch load={load} />
        </div>
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
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>$ {p.cost}</td>
                <td>{p.department}</td>
                <td>{p.category}</td>
                <td>
                  <Button onClick={() => editProduct(p.id)}>
                    <PencilIcon /> Edit
                  </Button>
                  <i className="m-1" />
                  <Button variant="danger" onClick={() => deleteProduct(p.id)}>
                    <TrashIcon /> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <DataPaginate total={total} load={load} setPage={setPage} page={page} />
    </Container>
  );
};
