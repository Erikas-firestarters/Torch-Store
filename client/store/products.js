import axios from 'axios'
import history from '../history'

const GET_PRODUCTS = 'GET_PRODUCTS';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const ADD_PRODUCT = 'ADD_PRODUCT';

const productsState = [];

const getProducts = (products) => ({type: GET_PRODUCTS, products});
const removeProduct = (id) => ({type: REMOVE_PRODUCT, id});
const updateProduct = (product) => ({type: UPDATE_PRODUCT, product});
const addProduct = (product) => ({type: ADD_PRODUCT, product});


export const fetchProducts = () =>
  (dispatch) =>
    axios.get('/api/products')
      .then(res => dispatch(getProducts(res.data)))
      .catch(err => console.error(err))

export const editProduct = (id, product) => dispatch =>
  axios
    .put(`/api/products/${id}`, product)
    .then(res => dispatch(updateProduct(res.data)))
    .catch(err => console.error(err));

export const postProduct = product => dispatch =>
  axios
    .post('/api/products', product )
    .then(res => {
      dispatch(addProduct(res.data))})
    .catch(err => console.error(err));

export const deleteProduct = id => dispatch =>
  axios
    .delete(`/api/products/${id}`)
    .then(() => dispatch(removeProduct(id)))
    .catch(err => console.log(err));


export default function (state = productsState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
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
