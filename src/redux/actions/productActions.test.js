import configureMockStore from "redux-mock-store";
import { ActionTypes } from ".";
import {
  addProduct,
  deleteProductById,
  editProductById,
  getAllProducts,
} from "./productActions";
import thunk from "redux-thunk";
import axios from "axios";

jest.mock("../store.js");
jest.mock("axios");

const data = [
  {
    id: 1,
    name: "Bluza",
    cost: "44",
    department: "Ropa",
    category: "Ropa de mujer",
  },
  {
    id: 2,
    name: "Chort",
    cost: "34",
    department: "Ropa",
    category: "Ropa de hombre",
  },
];

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();

describe("productActions", () => {
  afterEach(() => {
    store.clearActions();
  });
  it("getAllProducts", async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data, headers: { "x-total-count": data.length } })
    );

    const expectedActions = [
      { type: ActionTypes.PRODUCT_FETCH },
      { type: ActionTypes.PRODUCT_SUCCESS, payload: data },
    ];

    let count = await store.dispatch(getAllProducts({}));

    console.log(store.getState );

    expect(store.getActions()).toEqual(expectedActions);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(count).toBe(data.length);
  });
  it("addProduct", async () => {
    let newData = {
      id: 3,
      name: "Bluza",
      cost: "44",
      department: "Ropa",
      category: "Ropa de mujer",
    };
    axios.post.mockImplementationOnce(() =>
      Promise.resolve({ data: newData, status: 201 })
    );

    const expectedActions = [
      { type: ActionTypes.PRODUCT_FETCH },
      { type: ActionTypes.PRODUCT_STOP_FETCH },
    ];

    let result = await store.dispatch(addProduct(newData));

    expect(store.getActions()).toEqual(expectedActions);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(result).toBe(true);
  });
  it("deleteProductById", async () => {
    let deleteData = {
      id: 1,
    };
    axios.delete.mockImplementationOnce(() => Promise.resolve({ status: 200 }));

    const expectedActions = [
      { type: ActionTypes.PRODUCT_FETCH },
      { type: ActionTypes.PRODUCT_DELETE, payload: 1 },
    ];

    let result = await store.dispatch(deleteProductById(deleteData.id));

    expect(store.getActions()).toEqual(expectedActions);
    expect(axios.delete).toHaveBeenCalledTimes(1);
    expect(result).toBe(true);
  });
  it("editProductById", async () => {
    let id = 2;
    let editData = {
      name: "Chort",
      cost: "34",
      department: "Ropa",
      category: "Ropa de hombre",
    };
    axios.put.mockImplementationOnce(() => Promise.resolve({ status: 200 }));

    const expectedActions = [
      { type: ActionTypes.PRODUCT_FETCH },
      { type: ActionTypes.PRODUCT_STOP_FETCH },
    ];

    let result = await store.dispatch(editProductById(id, editData));

    expect(store.getActions()).toEqual(expectedActions);
    expect(axios.put).toHaveBeenCalledTimes(1);
    expect(result).toBe(true);
  });
});
