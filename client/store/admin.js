import axios from 'axios'
import history from '../history'

const GET_ALL_USERS = 'GET_ALL_USERS'
const UPDATE_USER = 'UPDATE_USER'
const DELETE_USER = 'DELETE_USER'

const getUsers = users => ({ type: GET_ALL_USERS, users });
const updateUser = user => ({type: UPDATE_USER, user});
const deleteUser = id => ({type: DELETE_USER, id})


export default function reducer(users = [], action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users;
    case UPDATE_USER:
      return users.map( user => (
        action.user.id === user.id ? action.user : user
      ))
    case DELETE_USER:
      return users.filter( user => user.id !== action.id );
    default:
      return users;
  }
}

export const fetchUsers = () => dispatch => {
  axios.get('/api/admin')
   .then(res => dispatch(getUsers(res.data)))
  }

export const updateUserInfo = (id, user) => dispatch => {
  axios.put(`/api/users/${id}`, user)
  .then( res => {
    dispatch(updateUser(res.data))
  })
  .catch(err => console.error('updating user was unsuccessful', err))
}

export const deleteUserForever = id => dispatch => {
  return axios.delete(`/api/users/${id}`)
  .then( () => {
    return dispatch(deleteUser(id))})
  .catch(err => console.error('removing user was unsuccesful', err))
}
