

/**
 * ACTION TYPES
 */
const SET_CATEGORY = 'SET_CATEGORY';
const REMOVE_ACTIVE_CATEGORY = 'REMOVE_ACTIVE_CATEGORY';

/**
 * INITIAL STATE
 */
const defaultCategory = {name: '', id: 0};

/**
 * ACTION CREATORS
 */
const setActive = category => ({ type: SET_CATEGORY, category });
const removeActive = (category) => ({type: REMOVE_ACTIVE_CATEGORY, category})

/**
 * THUNK CREATORS
 */
export const setActiveCategory = (category) => dispatch =>
  dispatch(setActive(category || defaultCategory));
export const removeActiveCategory = () => dispatch =>
  dispatch(removeActive(defaultCategory))
/**
 * REDUCER
 */
export default function(state = defaultCategory, action) {
  switch (action.type) {
    case SET_CATEGORY:
      return action.category;
    case REMOVE_ACTIVE_CATEGORY:
      return action.category;
    default:
      return state;
  }
}
