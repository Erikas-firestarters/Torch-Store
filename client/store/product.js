import axios from 'axios'
import history from '../history'

const GET_PRODUCT = 'GET_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const ADD_PRODUCT = 'ADD_PRODUCT';

const selectedProduct = {};

const getProducts = (products) => ({type: GET_PRODUCTS, products});

const getProduct = (product) => ({type: GET_PRODUCT, product});
const removeProduct = () => ({type: REMOVE_PRODUCT});
const updateProduct = (product) => ({type: UPDATE_PRODUCT, product});
const addProduct = (product) => ({type: ADD_PRODUCT, product});



// export default function (state = products, action) {
//  switch (action.type) {
//    case GET_PRODUCT: {

//    }
//  }
// }
