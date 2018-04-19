import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const SET_CATEGORY = 'SET_CATEGORY';

/**
 * INITIAL STATE
 */
const defaultCategory = 'Torch';

/**
 * ACTION CREATORS
 */
const setActive = category => ({ type: SET_CATEGORY, category });

/**
 * THUNK CREATORS
 */
export const setActiveCategory = (category) => dispatch =>
  dispatch(setActive(category || defaultCategory));

/**
 * REDUCER
 */
export default function(state = defaultCategory, action) {
  switch (action.type) {
    case SET_CATEGORY:
      return action.category;
    default:
      return state;
  }
}
