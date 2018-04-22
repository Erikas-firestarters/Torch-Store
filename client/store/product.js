import axios from 'axios'

const GET_PRODUCT = 'GET_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const ADD_PRODUCT = 'ADD_PRODUCT';

const selectedProduct = {};

const getProduct = (product) => ({type: GET_PRODUCT, product});
const removeProduct = () => ({type: REMOVE_PRODUCT});
const updateProduct = (product) => ({type: UPDATE_PRODUCT, product});
const addProduct = (product) => ({type: ADD_PRODUCT, product});

export const fetchProduct = (id) =>
  (dispatch) =>
    axios.get(`/api/products/${id}`)
    .then( res => dispatch(getProduct(res.data)))
    .catch( err => console.error(err));

/* ____TODO_____
  SET UP AXIOS REQUESTS FOR ADMIN PUT/POST/DELETE */

export default function (state = selectedProduct, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product;
    case REMOVE_PRODUCT:
      return action;
    case UPDATE_PRODUCT:
      return action.product;
    case ADD_PRODUCT:
      return action.product;
    default:
      return state;
 }
}
