import axios from 'axios'

const GET_ORDERS = 'GET_ORDERS'

/**
 * INITIAL STATE
 */
const Orders = {}

/**
 * ACTION CREATORS
 */
const getOrders = orders => ({type: GET_ORDERS, orders})

/**
 * THUNK CREATORS
 */
export const orders = () =>
  dispatch =>
    axios.get('api/users/:id/orders/')
      .then(res =>
        dispatch(getOrders(res.data || Orders)))
      .catch(err => console.log(err))

      /**
 * REDUCER
 */
export default function (state = Orders, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    default:
      return state
  }
}
