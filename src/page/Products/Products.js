import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container, Table } from "react-bootstrap";
import { PlusIcon } from "@primer/octicons-react";
import { getAllProducts } from "../../redux/actions/productActions";
import { AlertMessage } from "../../components/AlertMessage/AlertMessage";
import { Loading } from "../../components/Loading/Loading";
import { DataPaginate } from "../../components/DataPaginate/DataPaginate";
import { DataForm } from "../../components/DataForm/DataForm";
import { DataSearch } from "../../components/DataSearch/DataSearch";
import { ProductItem } from "../../components/ProductItem/ProductItem";

export const Products = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [editId, setEditId] = useState(null);
  const { error, loading } = useSelector((state) => state.productReducer);

  useEffect(() => {
    load();
  }, [page]);

  const load = async (q = "") => {
    setTotal(parseInt(await dispatch(getAllProducts({ page, q }))));
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
          id="btn-add"
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
            <ProductItem setEditId={setEditId} load={load} setShow={setShow} />
          </tbody>
        </Table>
      )}
      <DataPaginate total={total} setPage={setPage} page={page} />
    </Container>
  );
};
