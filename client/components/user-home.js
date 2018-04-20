import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import UserDetail from './user-detail'
import ProductDetail from './product-detail';
import Cart from './cart'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email} = props

  return (
    <div>
      <Cart />
      <h3>Welcome, {email}</h3>
      <UserDetail />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
