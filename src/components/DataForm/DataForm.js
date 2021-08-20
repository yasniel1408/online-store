import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { addProduct } from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { getAllDepartment } from "../../redux/actions/departmentActions";
import { getCategoryById } from "../../redux/actions/categoryActions";
import { Loading } from "../Loading/Loading";

export const DataForm = ({ show, handleClose }) => {
  const dispatch = useDispatch();

  const { departments, errorDepartment, loadingDepartment } = useSelector(
    (state) => state.departmentReducer
  );

  const { categories, errorCategory, loadingCategory } = useSelector(
    (state) => state.categoryReducer
  );

  const selectCategory = useRef();

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm({
    defaultValues: {
      name: null,
      cost: null,
      department: "",
      category: "",
    },
  });

  useEffect(() => {
    const load = async () => {
      dispatch(await getAllDepartment());
    };
    load();
  }, []);

  const onSubmit = (data) => {
    dispatch(addProduct(data));
  };

  const changeDepartment = async () => {
    dispatch(getCategoryById(getValues("department")));
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Product</Modal.Title>
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
                onBlur={changeDepartment()}
              >
                <option value="">Select the Department</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>
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
                  <option key={c.id} value={c.id}>
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
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Modal.Footer>
          <DevTool control={control} />
        </Form>
      </Modal>
    </div>
  );
};

DataForm.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
};
