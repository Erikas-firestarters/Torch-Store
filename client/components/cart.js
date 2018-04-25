import React, { Component } from 'react';

import { Grid, Sticky, Container, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { CartItem, CartWidget } from '../components';

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
          {cart.length ? (
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
          ) : (
            <div className="center">
            <Header as="h2">
              There are no items in your cart.
            </Header>
            </div>
          )}
        </div>
      </Container>
    );
  }
}

const mapState = ({ cart }) => ({ cart });

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Cart);
