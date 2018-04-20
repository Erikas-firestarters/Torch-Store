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
    .get('/cart')
    .then(res => dispatch(init(res.data || defaultCart)))
    .catch(err => console.log(err));
export const removeCartItem = cartItem => {
  dispatch(remove(cartItem))
  const { cartItemId } = cartItem;
//   return dispatch =>
//     axios
//       .delete('/cart')
//       .then(() => dispatch(remove(cartItemId)))
//       .catch(err => console.log(err));
// };
export const addCartItem = product => dispatch =>

  dispatch(add(product))

  // axios
  //   .post('/cart', product)
  //   .then(res => dispatch(add(res.data || defaultCart)))
  //   .catch(err => console.log(err));
export const updateCartItem = updatedCartItem => dispatch =>
  axios
    .put('/cart', updatedCartItem)
    .then(res => dispatch(update(res.data || defaultCart)))
    .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function(state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.state;
    case REMOVE_CART_ITEM:
      return state.filter(item => item.id !== state.cartItemId);
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