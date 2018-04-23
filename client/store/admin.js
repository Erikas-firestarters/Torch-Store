import axios from 'axios'
import history from '../history'

const GET_ALL_USERS = 'GET_ALL_USERS'

const getUsers = users => ({ type: GET_ALL_USERS, users });

export default function reducer(users = [], action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users;
    default:
      return users;
  }
}

export const fetchUsers = () => dispatch => {
  axios.get('/api/admin')
   .then(res => dispatch(getUsers(res.data)))
  }
