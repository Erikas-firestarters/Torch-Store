import React from 'react';
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

function Cart(props) {
  const { cart } = props;
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return (
    <Container>
      <Grid>
        <Grid.Column width={12}>
          <Grid divided="vertically">
            {cart.map(item => (
              <CartItem isCheckout={false} key={item.id} item={item} header="Cart" />
            ))}
          </Grid>
        </Grid.Column>
        <Grid.Column width={4}>
          <Sticky>
            <CartWidget subtotal={subtotal} />
          </Sticky>
        </Grid.Column>
      </Grid>
    </Container>
  );
}

const mapState = ({ cart }) => ({ cart });

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Cart);
