import axios from 'axios'

const GET_ORDERS = 'GET_ORDERS'


/**
 * ACTION CREATORS
 */
const getOrders = orders => ({type: GET_ORDERS, orders})

/**
 * THUNK CREATORS
 */
export const fetchOrders = id =>
  dispatch =>
    axios.get(`/api/users/${id}/orders`)
      .then(res => dispatch(getOrders(res.data)))
      .catch(err => console.log(err))

      /**
 * REDUCER
 */
export default function (orders = [], action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders;
    default:
      return orders
  }
}
