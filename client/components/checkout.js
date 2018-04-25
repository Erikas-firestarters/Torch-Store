import React, { Component } from 'react';
import {
  Button,
  Item,
  Grid,
  Sticky,
  Header,
  Container,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { CartItem, AddressForm, CheckoutWidget } from '../components';
import { finalizeOrder, emptyCart, emptyReduxCart } from '../store';
import history from '../history';

export class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      shipping: {
        firstName: '',
        lastName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipcode: '',
      },
      billing: {
        firstName: '',
        lastName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipcode: '',
      },
      subtotal: 0,
      checkBox: true,
    };

    this.handleShippingChange = this.handleShippingChange.bind(this);
    this.handleBillingChange = this.handleBillingChange.bind(this);
    this.handleBillingDropdownChange = this.handleBillingDropdownChange.bind(
      this
    );
    this.handleShippingDropdownChange = this.handleShippingDropdownChange.bind(
      this
    );
    this.handleOrderSubmit = this.handleOrderSubmit.bind(this);
    this.handleSubmitButtonRef = this.handleSubmitButtonRef.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleOrderSubmit = async e => {
    const { subtotal } = this;
    const { user, cart, submitOrder, deleteBackendCart } = this.props;
    const { billing, shipping, checkBox } = this.state;
    billing.fullName = `${billing.firstName} ${billing.lastName}`;
    shipping.fullName = `${shipping.firstName} ${shipping.lastName}`;
    const order = {
      billing: checkBox ? shipping : billing,
      shipping,
      user,
      subtotal,
      tax: subtotal * 0.1,
      cart,
    };
    try {
      await submitOrder(order, this.props.isLoggedIn);
      if (user.id) deleteBackendCart();
      history.push('/home');
    } catch (err) {
      console.err(err);
    }
  };

  handleShippingChange(e, key) {
    this.setState({
      shipping: { ...this.state.shipping, [key]: e.target.value },
    });
  }
  handleCheckboxChange(e, { checked }) {
    this.setState({
      checkBox: checked,
    });
  }
  handleBillingChange(e, key) {
    this.setState({
      billing: { ...this.state.billing, [key]: e.target.value },
    });
  }
  handleShippingDropdownChange(e, { value }) {
    this.setState({ shipping: { ...this.state.shipping, state: value } });
  }
  handleBillingDropdownChange(e, { value }) {
    this.setState({ billing: { ...this.state.billing, state: value } });
  }
  handleStickyContextRef = contextRef => this.setState({ contextRef });

  handleSubmitButtonRef = submitButtonRef => {
    this.submitButtonRef = submitButtonRef;
  };
  render() {
    const { contextRef, checkBox } = this.state;
    const { cart } = this.props;
    this.subtotal = cart.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity,
      0
    );
    return (
      <Container>
        <div ref={this.handleStickyContextRef}>
          <Grid>
            <Grid.Column width={12}>
              <Grid.Row>
                <Header as="h2" textAlign="center">
                  Checkout
                </Header>
              </Grid.Row>
              <Grid.Row>
                <Header as="h4" textAlign="center">
                  Shipping:
                </Header>
                <AddressForm
                  handleShippingChange={this.handleShippingChange}
                  handleBillingChange={this.handleBillingChange}
                  handleShippingDropdownChange={
                    this.handleShippingDropdownChange
                  }
                  handleBillingDropdownChange={this.handleBillingDropdownChange}
                  handleSubmitButtonRef={this.handleSubmitButtonRef}
                  handleCheckboxChange={this.handleCheckboxChange}
                  handleOrderSubmit={this.handleOrderSubmit}
                  checkBox={checkBox}
                />
              </Grid.Row>
              <Grid.Row>
                <Header as="h4" textAlign="center">
                  Payment information:
                </Header>
              </Grid.Row>
              <Grid.Row>
                <Header as="h4" textAlign="center">
                  Review and confirm order:
                </Header>
                {cart.length ? (
                  <Item.Group divided>
                    {cart.map(item => (
                      <CartItem isOrder={true} key={item.id} item={item} />
                    ))}
                  </Item.Group>
                ) : (
                  <Header as="h4" textAlign="center">
                    No items in cart
                  </Header>
                )}
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={4}>
              <Sticky
                bottomOffset={50}
                context={contextRef}
                offset={50}
                pushing
              >
                <CheckoutWidget
                  handleOrderSubmit={this.handleOrderSubmit}
                  subtotal={this.subtotal}
                  submitButtonRef={this.submitButtonRef}
                />
              </Sticky>
            </Grid.Column>
          </Grid>
        </div>
      </Container>
    );
  }
}
const mapState = ({ cart, user }) => ({ cart, user, isLoggedIn: !!user.id });

const mapDispatch = dispatch => ({
  submitOrder(order, isLoggedIn) {
    if (isLoggedIn) dispatch(emptyCart());
    else dispatch(emptyReduxCart());
    return dispatch(finalizeOrder(order));
  },
  deleteBackendCart() {
    return dispatch(emptyCart());
  },
});

export default connect(mapState, mapDispatch)(Checkout);
