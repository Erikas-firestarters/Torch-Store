import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import UserDetail from './user-detail'
import {fetchOrders} from '../store/userOrders'
import {Segment, Button, Popup, Modal, Header} from 'semantic-ui-react'


/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  constructor() {
    super()
    this.state = {open: false};
  }

  componentDidMount() {

		this.props.fetchInitialData(this.props.id);
  }
  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })
  render() {
    const { open, dimmer } = this.state
  return (
    <div className="centered">
      <h3>Welcome, {this.props.email}</h3>
      <div className="ui raised very padded text container segment">
      <h3 className="ui fluid top attached header">User Detail</h3>
      <Segment attached>
        <Segment>
          <p>Email: {this.props.email}</p>
        </Segment>
      </Segment>
      <h3 className="ui attached header">Orders</h3>
      <Segment attached>
      {this.props.orders && this.props.orders.map(order => (
        <Segment key={order.id}>
          <p>Date Created: {Date(order.createdAt)}</p>
          <p>Total: ${Number(order.subtotal) + Number(order.tax)}</p>
          <p>Status: {order.status}</p>
          <Button onClick={this.show('blurring')}>See More</Button>
          <Popup trigger={<Button onClick={this.show(false)}>None</Button>}>
          <Popup.Header>Heads up!</Popup.Header>
          <Popup.Content>
            By default, a Modal closes when escape is pressed or when the dimmer is
            clicked. Setting the dimmer to "None" (dimmer={'{'}false{'}'}) means that there is no
            dimmer to click so clicking outside won't close the Modal. To close on
            outside click when there's no dimmer, you can pass the "closeOnDocumentClick" prop.
          </Popup.Content>
        </Popup>

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Select a Photo</Modal.Header>
          <Modal.Content image>
            <Image wrapped size="medium" src="https://react.semantic-ui.com/assets/images/avatar/large/rachel.png" />
            <Modal.Description>
              <Header>Default Profile Image</Header>
              <p>We've found the following gravatar image associated with your e-mail address.</p>
              <p>Is it okay to use this photo?</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color="black" onClick={this.close}>
              Nope
            </Button>
            <Button positive icon="checkmark" labelPosition="right" content="Yep, that's me" onClick={this.close} />
          </Modal.Actions>
        </Modal>
        </Segment>
      ))}
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
    orders: state.userOrders,
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
