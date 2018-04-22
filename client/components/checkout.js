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
    this.handleOrderSubmit = this.handleOrderSubmit.bind(this);
  }

  handleOrderSubmit = (e) => {
    console.log('submitting order', e)
  };

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
  handleContextRef = contextRef => this.setState({ contextRef });

  render() {
    const { contextRef } = this.state;
    const { cart } = this.props;
    return (
      <Container>
        <div ref={this.handleContextRef}>
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
                <CheckoutWidget handleOrderSubmit={this.handleOrderSubmit} />
              </Sticky>
            </Grid.Column>
          </Grid>
        </div>
      </Container>
    );
  }
}
const mapState = ({ cart, user }) => ({ cart, user });

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Checkout);
