import React, { Component } from 'react';
import {
  Button,
  Item,
  Grid,
  Icon,
  Label,
  Sticky,
  Header,
  Form,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { CartItem, CheckoutForm } from '../components';
import { NavLink } from 'react-router-dom';
import NumberFormat from 'react-number-format';

export class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      shippingFirstName: '',
      shippingLastName: '',
      shippingAddressLine1: '',
      shippingAddressLine2: '',
      shippingCity: '',
      shippingState: '',
      shippingZipCode: '',
      billingFirstName: '',
      billingLastName: '',
      billinAddressLine1: '',
      billingAddressLine2: '',
      villingCity: '',
      billingState: '',
      billingZipCode: '',
    };
  }

  render() {
    const { cart } = this.props;
    const subTotal = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    return (
      <Grid>
        <Grid.Column width={12}>
          <Grid.Row>
            <Header as="h2" textAlign="center">
              Checkout
            </Header>
          </Grid.Row>
          <Grid.Row>
            <Header as="h4" textAlign="center">
              Shipping/Billing address:
            </Header>
            <CheckoutForm />
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
            <Item.Group divided>
              {cart.map(item => <CartItem key={item.id} item={item} />)}
            </Item.Group>
          </Grid.Row>
        </Grid.Column>
        <Grid.Column width={4}>
          <Sticky>
            <Button as="div" labelPosition="right">
              <Button as={NavLink} to="/checkout" icon>
                <Icon name="cart" />
                Checkout
              </Button>
              <Label color="teal" basic pointing="left">
                <NumberFormat
                  value={subTotal}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$'}
                />
              </Label>
            </Button>
          </Sticky>
        </Grid.Column>
      </Grid>
    );
  }
}
const mapState = ({ cart }) => ({ cart });

const mapDispatch = dispatch => {
  return {
    handleRemove(e) {
      dispatch(removeCartItem(item.id));
    },
    handleCartChange(e) {
      console.log(e);
    },
  };
};

export default connect(mapState, mapDispatch)(Checkout);
