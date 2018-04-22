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
import { CartItem, AddressForm } from '../components';
import { NavLink } from 'react-router-dom';
import NumberFormat from 'react-number-format';

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
        zipCode: '',
      },
      billing: {
        firstName: '',
        lastName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipCode: '',
      },
    };
    this.handleShippingChange = this.handleShippingChange.bind(this);
    this.handleBillingChange = this.handleBillingChange.bind(this);
    this.handleBillingDropdownChange = this.handleBillingDropdownChange.bind(
      this
    );
    this.handleShippingDropdownChange = this.handleShippingDropdownChange.bind(
      this
    );
  }

  handleShippingChange(e, key) {
    this.setState({
      shipping: { ...this.state.shipping, [key]: e.target.value },
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

  render() {
    console.log('render func', this.state);
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
              Shipping:
            </Header>
            <AddressForm
              handleShippingChange={this.handleShippingChange}
              handleBillingChange={this.handleBillingChange}
              handleShippingDropdownChange={this.handleShippingDropdownChange}
              handleBillingDropdownChange={this.handleBillingDropdownChange}
            />
          </Grid.Row>
          <Grid.Row>
            <Header as="h4" textAlign="center">
              Payment information:
            </Header>
          </Grid.Row>
          <Grid.Row>
            ˝
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
const mapState = ({ cart, user }) => ({ cart, user });

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
