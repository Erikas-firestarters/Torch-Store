import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART';
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';
const ADD_CART_ITEM = 'ADD_CART_ITEM';
const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';
const EMPTY_CART = 'EMPTY_CART';
const SET_CART = 'SET_CART';

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
const empty = _ => ({ type: EMPTY_CART, defaultCart });
const setCart = cart => ({ type: SET_CART, cart });

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
    dispatch(remove(cartItem.id));
  } else {
    const { cartItemId } = cartItem;
    axios
      .delete(`/api/cart/${cartItemId}`)
      .then(() => dispatch(remove(cartItem.id || defaultCart)))
      .catch(err => console.log(err));
  }
};

export const emptyCart = () => dispatch => {
  return axios
    .delete(`/api/cart/`)
    .then(() => dispatch(empty()))
    .catch(err => console.log(err));
};

export const emptyReduxCart = () => dispatch => {
  return dispatch(empty());
};

export const addCartItem = (cartItem, isLoggedIn) => dispatch => {
  if (!isLoggedIn) {
    dispatch(add(cartItem));
  } else {
    let backendItem = {};
    backendItem.quantity = cartItem.quantity;
    backendItem.productId = cartItem.id;
    axios
      .post('/api/cart', backendItem)
      .then(res => {
        cartItem.cartItemId = res.data.id;
        return dispatch(add(cartItem || defaultCart));
      })
      .catch(err => console.log(err));
  }
};

export const transferCart = cart => dispatch => {
  axios
    .post('/api/cart/transfer', cart)
    .then(res => {
        res.data.forEach(ele => {
          ele.description = ele.product.description;
          ele.imageUrl = ele.product.imageUrl;
          ele.inventory = ele.product.inventory;
          ele.name = ele.product.name;
          ele.price = ele.product.price;
          ele.cartItemId = ele.id;
          ele.id = ele.productId
          delete ele.productId
          delete ele.product;
          return ele;
        });
        return dispatch(setCart(res.data || defaultCart));
      }
    );
};

export const updateCartItem = (cartItem, isLoggedIn) => dispatch => {
  if (!isLoggedIn) {
    dispatch(update(cartItem));
  } else {
    let backendItem = {};
    backendItem.quantity = cartItem.quantity;
    backendItem.productId = cartItem.id;
    backendItem.id = cartItem.cartItemId;
    axios
      .put('/api/cart', backendItem)
      .then(() => dispatch(update(cartItem || defaultCart)))
      .catch(err => console.log(err));
  }
};
export const finalizeOrder = order => dispatch => {
  axios
    .post('/api/order', order)
    .then(() => dispatch(init([])))
    .catch(err => console.log(err));
  history.push('/products');
};

/**
 * REDUCER
 */
export default function(state = defaultCart, action) {
  switch (action.type) {
    case EMPTY_CART:
      return action.defaultCart;
    case GET_CART:
      return state.length ? state : action.cart;
    case REMOVE_CART_ITEM:
      return state.filter(item => item.id !== action.cartItemId);
    case ADD_CART_ITEM:
      return [...state, action.cartItem];
    case UPDATE_CART_ITEM:
      return state.map(
        item => (action.cartItem.id === item.id ? action.cartItem : item)
      );
    case SET_CART:
      return action.cart;
    default:
      return state;
  }
}
