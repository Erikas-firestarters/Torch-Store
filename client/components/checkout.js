import React, { Component } from 'react';
import {
  Button,
  Item,
  Grid,
  Sticky,
  Header,
  Container,
  Form,
  Checkbox,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { CartItem, AddressForm, CheckoutWidget } from '../components';
import { finalizeOrder, emptyCart, emptyReduxCart } from '../store';
import history from '../history';
import { Field, reduxForm, FormSection } from 'redux-form';
import stateOptions from './all-states';
import {validate, warn} from './form-validation';

export class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      checkBox: true,

    };
    this.handleOrderSubmit = this.handleOrderSubmit.bind(this);
    this.handleSubmitButtonRef = this.handleSubmitButtonRef.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleOrderSubmit = async e => {
    console.log('ORDER SUBMITTED')
    const { billing, shipping } = this.props.formState.checkout.values;
    console.log('billing', billing)
    console.log('shipping', shipping)
    const { subtotal } = this;
    const { user, cart, submitOrder, deleteBackendCart } = this.props;
    const { checkBox } = this.state;
    // billing.fullName = `${billing.firstName} ${billing.lastName}`;
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
<<<<<<< HEAD
      await submitOrder(order);
      if (user.id) {
        deleteBackendCart();
        history.push('/home');
      } else {
        history.push('/')
      }
=======
      await submitOrder(order, this.props.isLoggedIn);
      if (user.id) deleteBackendCart();
      history.push('/home');
>>>>>>> b5dae02f3a6a5beea4217f062686bb202caef1a7
    } catch (err) {
      console.err(err);
    }
  };

  handleCheckboxChange(e, { checked }) {
    this.setState({
      checkBox: checked,
    });
  }
  handleStickyContextRef = contextRef => this.setState({ contextRef });

  handleSubmitButtonRef = submitButtonRef => {
    this.submitButtonRef = submitButtonRef;
  };
  render() {
    const { contextRef, checkBox } = this.state;
    const { cart, formState} = this.props;
    console.log('form state', formState)
    this.subtotal = cart.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity,
      0
    );
    return (
      <div className="checkout-cart">
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
                  <Form onSubmit={this.handleOrderSubmit}>
                    <FormSection name="shipping">
                      <AddressForm />
                    </FormSection>
                    <Form.Group grouped>
                      <Checkbox
                        defaultChecked
                        label="Billing and shipping address are the same."
                        onChange={this.handleCheckboxChange}
                      />
                    </Form.Group>
                    {!checkBox ? (
                      <FormSection name="billing">
                        <AddressForm />
                      </FormSection>
                    ) : (
                      <div />
                    )}
                    <Form.Group>
                      <Button as="button" type="submit">
                        Process Order
                      </Button>
                    </Form.Group>
                  </Form>
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
                        <CartItem isCheckout={true} key={item.id} item={item} />
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
      </div>
    );
  }
}
const mapState = ({ cart, user, form: formState }) => ({ cart, user, formState });

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

Checkout = reduxForm({ form: 'checkout', validate, warn })(Checkout);

export default connect(mapState, mapDispatch)(Checkout);
