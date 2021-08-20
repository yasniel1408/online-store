import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
// import { DevTool } from "@hookform/devtools";
import {
  addProduct,
  editProductById,
} from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { getAllDepartment } from "../../redux/actions/departmentActions";
import { getCategoryById } from "../../redux/actions/categoryActions";
import { Loading } from "../Loading/Loading";

export const DataForm = ({ show, handleClose, editId, setEditId, load }) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productReducer);
  const { departments, errorDepartment, loadingDepartment } = useSelector(
    (state) => state.departmentReducer
  );
  const { categories, errorCategory, loadingCategory } = useSelector(
    (state) => state.categoryReducer
  );

  const {
    register,
    // control,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      cost: null,
      department: "",
      category: "",
    },
  });

  useEffect(() => {
    const loadForm = async () => {
      dispatch(getAllDepartment());
      if (editId) {
        const p = await products.find(
          (currentValue) => currentValue.id === editId
        );
        let dep = await departments.find(
          (currentValue) => currentValue.name === p.department
        );
        setValue("name", p.name);
        setValue("cost", p.cost);
        setValue("department", dep.id);

        dispatch(await getCategoryById(dep.id));

        let categ = categories.find(
          (currentValue) => currentValue.name === p.category
        );
        setValue("category", categ.id);
      }
    };
    loadForm();
  }, [editId, setEditId]);

  const onSubmit = async (data) => {
    data.department = departments.find(
      (currentValue) => currentValue.id === parseInt(data.department)
    ).name;
    data.category = categories.find(
      (currentValue) => currentValue.id === parseInt(data.category)
    ).name;
    if (editId) {
      await dispatch(editProductById(editId, data));
    } else {
      await dispatch(addProduct(data));
    }
    load();
    setEditId(null);
    handleClose();
    reset();
  };

  const changeDepartment = () => {
    dispatch(getCategoryById(getValues("department")));
  };

  const closeModal = () => {
    setEditId(null);
    handleClose();
    reset();
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Product</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                {...register("name", { required: true, maxLength: 15 })}
                type="text"
                placeholder="Enter the product name"
              />
              <Form.Text className="text-danger">
                {errors.name?.type === "required" && "Name is required"}
                {errors.name?.type === "maxLength" &&
                  "Can not have more than 15 characters"}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="cost">
              <Form.Label>Cost</Form.Label>
              <Form.Control
                type="number"
                {...register("cost", { required: true })}
                placeholder="Enter the product cost"
              />
              <Form.Text className="text-danger">
                {errors.cost?.type === "required" && "Name is required"}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="department">
              <Form.Label>Department</Form.Label>
              <Form.Select
                {...register("department", { required: true })}
                aria-label="Select the Department"
                onBlur={() => changeDepartment()}
              >
                <option value="">Select the Department</option>
                {departments.map((d) => (
                  <option key={d.id} value={`${d.id}`}>
                    {d.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Text className="text-danger">
                {errors.department?.type === "required" &&
                  "Department is required"}
                {errorDepartment && errorDepartment.message}
              </Form.Text>
              {loadingDepartment && <Loading size="sm" />}
            </Form.Group>

            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Select
                {...register("category", { required: true })}
                aria-label="Select the Category"
              >
                <option value="">Select the Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={`${c.id}`}>
                    {c.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Text className="text-danger">
                {errors.category?.type === "required" && "Category is required"}
                {errorCategory && errorCategory.message}
              </Form.Text>
              {loadingCategory && <Loading size="sm" />}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => closeModal()}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Save
            </Button>
          </Modal.Footer>
          {/* <DevTool control={control} /> */}
        </Form>
      </Modal>
    </div>
  );
};

DataForm.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  editId: PropTypes.number,
  setEditId: PropTypes.func,
  load: PropTypes.func,
};
