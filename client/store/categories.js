import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'GET_CATEGORIES'
const ADD_CATEGORY = 'ADD_CATEGORY'
const REMOVE_CATEGORY = 'REMOVE_CATEGORY'

/**
 * INITIAL STATE
 */
const defaultCategories = {}

/**
 * ACTION CREATORS
 */
const getCategories = category => ({type: GET_CATEGORIES, category})
const addCategory = category => ({type: ADD_CATEGORY, category})
const removeCategory = category => ({type: REMOVE_CATEGORY, category})

/**
 * THUNK CREATORS
 */
export const getCat = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getCategories(res.data || defaultCategories)))
      .catch(err => console.log(err))

export const addCat = (email, password, method) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password })
      .then(res => {
        dispatch(getCategories(res.data))
        history.push('/home')
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getCategories({error: authError}))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const removeCat = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(addCategory())
        history.push('/login')
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultCategories, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.user
    case ADD_CATEGORY:
      return defaultCategories
    default:
      return state
  }
}
