import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import UserDetail from './user-detail'
import {fetchOrders} from '../store/userOrders'
import {Segment, Container} from 'semantic-ui-react'


/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  constructor() {
    super()
    this.state = {};
  }

  componentDidMount() {
    console.log();

		this.props.fetchInitialData(this.props.id);
  }

  render() {
  return (
    <div className="centered">
      <h3>Welcome, {this.props.email}</h3>
      <div className="ui raised very padded text container segment">
      <h3 className="ui fluid top attached header">User Detail</h3>
      <Segment attached>
        <Segment>
          <p>Email: {this.props.userOrders}</p>
        </Segment>
      </Segment>
      <h3 className="ui attached header">Orders</h3>
      <Segment attached>
      {this.p}
        <Segment>
          <p>Order #1</p>
          <p>order placed: 1/25/2017</p>
          <p>subtotal: $18.65</p>
        </Segment>
      </Segment>
    </div>
    </div>
  )}
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email,
    id: state.user.id,
  }
}

const mapDispatch = dispatch => ({
  fetchInitialData: (id) => {
    dispatch(fetchOrders(id));
  }
})


export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
