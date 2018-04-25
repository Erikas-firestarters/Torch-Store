import React, { Component } from 'react';

import {
  Button,
  Item,
  Grid,
  Icon,
  Label,
  Sticky,
  Container,
  Card,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { CartItem, CartWidget } from '../components';
import { NavLink } from 'react-router-dom';
import NumberFormat from 'react-number-format';

export class Cart extends Component {
  constructor() {
    super();
    this.state = {
      contextRef: null,
    };
  }
  handleStickyContextRef = contextRef => this.setState({ contextRef });

  render() {
    const { cart } = this.props;
    const { contextRef } = this.state;

    const subtotal = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    return (
      <Container className="checkout-cart">
        <div ref={this.handleStickyContextRef}>
          <Grid>
            <Grid.Column width={12}>
              <Grid divided="vertically">
                {cart.map(item => (
                  <CartItem
                    isCheckout={false}
                    key={item.id}
                    item={item}
                    header="Cart"
                  />
                ))}
              </Grid>
            </Grid.Column>
            <Grid.Column width={4}>
              <Sticky
                bottomOffset={50}
                context={contextRef}
                offset={50}
                pushing
              >
                <CartWidget subtotal={subtotal} />
              </Sticky>
            </Grid.Column>
          </Grid>
        </div>
      </Container>
    );
  }
}

const mapState = ({ cart }) => ({ cart });

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Cart);
