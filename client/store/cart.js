import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART';
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';
const ADD_CART_ITEM = 'ADD_CART_ITEM';
const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';

/**
 * INITIAL STATE
 */
const defaultCart = [];

/**
 * ACTION CREATORS
 */
const init = cart => ({ type: GET_CART, cart });
const remove = cartItemId => ({ type: REMOVE_CART_ITEM, cartItemId });
const add = cartItem => ({ type: ADD_CART_ITEM, cartItem });
const update = cartItem => ({ type: UPDATE_CART_ITEM, cartItem });

/**
 * THUNK CREATORS
 */
export const getCart = () => dispatch =>
  axios
    .get('/api/cart')
    .then(res => dispatch(init(res.data || defaultCart)))
    .catch(err => console.log(err));

export const removeCartItem = (cartItem, isLoggedIn) => dispatch => {
  if (!isLoggedIn) {
    dispatch(remove(cartItem));
  } else {
    let backendItem = {};
    backendItem.quantity = cartItem.quantity;
    backendItem.productId = cartItem.id;
    axios
      .delete('/api/cart', backendItem)
      .then(() => dispatch(remove(cartItem || defaultCart)))
      .catch(err => console.log(err));
  }
};
export const addCartItem = (cartItem, isLoggedIn) => dispatch => {
  console.log('add cart item: Logged in', isLoggedIn)
  if (!isLoggedIn) {
    dispatch(add(cartItem));
  } else {
    let backendItem = {};
    backendItem.quantity = cartItem.quantity;
    backendItem.productId = cartItem.id;
    axios
    .post('/api/cart', backendItem)
    .then(() => dispatch(add(cartItem || defaultCart)))
    .catch(err => console.log(err));
  }
};

export const updateCartItem = (cartItem, isLoggedIn) => dispatch => {
  console.log('update cart item: Logged in', isLoggedIn)
  if (!isLoggedIn) {
    dispatch(update(cartItem));
  } else {
    let backendItem = {};
    backendItem.quantity = cartItem[0].quantity;
    backendItem.productId = cartItem[0].id;
    backendItem.id = cartItem[0].cartItemId;
    axios
      .put('/api/cart', backendItem)
      .then(() => dispatch(update(cartItem || defaultCart)))
      .catch(err => console.log(err));
  }
};

/**
 * REDUCER
 */
export default function(state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case REMOVE_CART_ITEM:
      return state.filter(item => item.id !== action.cartItemId);
    case ADD_CART_ITEM:
      return [...state, action.cartItem];
    case UPDATE_CART_ITEM:
      return state.map(
        item => (action.cartItem.id === item.id ? action.cartItem : item)
      );
    default:
      return state;
  }
}
