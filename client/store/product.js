import axios from 'axios'
import history from '../history'

const GET_PRODUCT = 'GET_PRODUCT';

const getProduct = (product) => ({type: GET_PRODUCT, product});

const productState = {};

export const fetchProduct = (id) =>
  (dispatch) =>
    axios.get(`/api/products/${id}`)
    .then( res => dispatch(getProduct(res.data)))
    .catch( err => console.error(err));


export default function (state = productState, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
