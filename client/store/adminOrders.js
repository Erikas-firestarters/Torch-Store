import axios from 'axios'
import history from '../history'

const ALL_ORDERS = 'ALL_ORDERS'
const EDIT_ORDER = 'EDIT_ORDER'
const DELETE_ORDER = 'DELETE_ORDER'

const allOrders = orders => ({type: ALL_ORDERS, orders})
const editOrder = order => ({type: EDIT_ORDER, order})
const deleteOrder = id => ({type: DELETE_ORDER, id})

export default function reducer(adminOrders = [], action) {
  switch (action.type) {
    case ALL_ORDERS:
      return action.orders;
    case EDIT_ORDER:
      return adminOrders.map( order => (
        action.order.id === order.id ? action.order : order
      ))
    case DELETE_ORDER:
      return adminOrders.filter( order => order.id !== action.id );
    default:
      return adminOrders
  }
}

export const fetchAllOrders = () => dispatch => {
  axios
  .get('/api/admin/orders')
  .then( res => dispatch(allOrders(res.data)))
  .catch(err => console.error('fetching orders was unsuccessful', err))
}

export const orderEditor = (id, order) => dispatch => {
  axios
  .get(`/api/admin/orders/${id}`, order)
  .then( res => dispatch(editOrder(res.data)))
  .catch(err => console.error('editing order was unsuccessful', err))
}

export const deleteOrderForever = id => dispatch => {
 return axios.delete(`/api/admin/orders/${id}`)
  .then( () =>  dispatch(deleteOrder(id)))
  .catch(err => console.error('removing order was unsuccesful', err))
}
