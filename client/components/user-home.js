import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import UserDetail from './user-detail'


/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email} = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <div className="ui container">
      <h3 className="ui top attached header">User Detail</h3>
      <div className="ui attached segment">
        <div className="ui segment">
          <p>Name: {console.log(props)} </p>
          <p>Email: samuelkogan@gmail.com</p>
        </div>
      </div>
      <h3 className="ui attached header">Orders</h3>
      <div className="ui attached segment">
        <div className="ui segment">
          <p>Order #3</p>
          <p>order placed: 2/02/2017</p>
          <p>subtotal: $44.55</p>
        </div>
        <div className="ui segment">
          <p>Order #2</p>
          <p>order placed: 2/01/2017</p>
          <p>subtotal: $20.05</p>
        </div>
        <div className="ui segment">
          <p>Order #1</p>
          <p>order placed: 1/25/2017</p>
          <p>subtotal: $18.65</p>
        </div>
      </div>
    </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email,
    order: state.userOrders
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
