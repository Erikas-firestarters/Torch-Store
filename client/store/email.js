import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const SEND_EMAIL = 'SEND_EMAIL';

/**
 * INITIAL STATE
 */
const defaultCategories = [];

/**
 * ACTION CREATORS
 */
const getCats = categories => ({ type: GET_CATEGORIES, categories });
const addCat = category => ({ type: ADD_CATEGORY, category });
const removeCat = category => ({ type: REMOVE_CATEGORY, category });

/**
 * THUNK CREATORS
 */
export const getCategories = () => dispatch =>
  axios
    .get('/api/products/categories')
    .then(res => dispatch(getCats(res.data || defaultCategories)))
    .catch(err => console.log(err));

export const addCategory = category => dispatch =>
  axios
    .post('/api/products/categories', { category })
    .then(res => dispatch(addCat(res.data)))
    .catch(err => console.error(err));

export const removeCategory = category => dispatch =>
  axios
    .delete('/api/products/categories', { category })
    .then(res => dispatch(removeCat(res.data)))
    .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function(state = defaultCategories, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories;
    case ADD_CATEGORY:
      return action.category;
    case REMOVE_CATEGORY:
      return action.category;
    default:
      return state;
  }
}
