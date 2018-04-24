import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'GET_CATEGORIES';
const ADD_CATEGORY = 'ADD_CATEGORY';
const REMOVE_CATEGORY = 'REMOVE_CATEGORY';

/**
 * INITIAL STATE
 */
const defaultCategories = [];

/**
 * ACTION CREATORS
 */
const getCats = categories => ({ type: GET_CATEGORIES, categories });
const addCat = category => ({ type: ADD_CATEGORY, category });
const removeCat = id => ({ type: REMOVE_CATEGORY, id });

/**
 * THUNK CREATORS
 */
export const getCategories = () => dispatch =>
  axios
    .get('/api/categories')
    .then(res => dispatch(getCats(res.data || defaultCategories)))
    .catch(err => console.log(err));

export const addCategory = category => dispatch =>
  axios
    .post('/api/categories', category )
    .then(res => {
      console.log(res.data)
      dispatch(addCat(res.data))
    })
    .catch(err => console.error(err));

export const removeCategory = id => dispatch =>
  axios
    .delete(`/api/categories/${id}`)
    .then(() => dispatch(removeCat(id)))
    .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function(state = defaultCategories, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories;
    case ADD_CATEGORY:
      return [action.category, ...state];
    case REMOVE_CATEGORY:
      return state.filter( category => category.id !== action.id)
    default:
      return state;
  }
}
