import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { deleteProductById } from "../../redux/actions/productActions";
import Swal from "sweetalert2";
import { PencilIcon, TrashIcon } from "@primer/octicons-react";
import { Button } from "react-bootstrap";

export const ProductItem = ({ setEditId, load, setShow }) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productReducer);

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
    <>
      {products?.map((p) => (
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
    </>
  );
};

ProductItem.propTypes = {
  setEditId: PropTypes.func,
  load: PropTypes.func,
  setShow: PropTypes.func,
};
