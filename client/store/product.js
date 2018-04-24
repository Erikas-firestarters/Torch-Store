import axios from 'axios'

const GET_PRODUCT = 'GET_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const ADD_PRODUCT = 'ADD_PRODUCT';

const selectedProduct = {};

const getProduct = (product) => ({type: GET_PRODUCT, product});
const removeProduct = (id) => ({type: REMOVE_PRODUCT}, id);
const updateProduct = (product) => ({type: UPDATE_PRODUCT, product});
const addProduct = (product) => ({type: ADD_PRODUCT, product});

export const fetchProduct = (id) =>
  (dispatch) =>
    axios.get(`/api/products/${id}`)
    .then( res => dispatch(getProduct(res.data)))
    .catch( err => console.error(err));

export const editProduct = (id, product) => dispatch =>
  axios
    .put(`/api/products/${id}`, product)
    .then(res => dispatch(updateProduct(res.data)))
    .catch(err => console.error(err));

export const postProduct = product => dispatch =>
  axios
    .post('/api/products', product )
    .then(res => dispatch(addProduct(res.data)))
    .catch(err => console.error(err));

export const deleteProduct = id => dispatch =>
  axios
    .delete(`/api/product/${id}`)
    .then(() => dispatch(removeProduct(id)))
    .catch(err => console.log(err));

/* ____TODO_____
  SET UP AXIOS REQUESTS FOR ADMIN PUT/POST/DELETE */

export default function (state = selectedProduct, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product;
    case ADD_PRODUCT:
      return [action.product, ...state]
    case UPDATE_PRODUCT:
      return state.map(product => (
        action.product.id === product.id ? action.product : product
      ))
    case REMOVE_PRODUCT:
      return state.filter(product => product.id !== action.id);
    default:
      return state;
 }
}
