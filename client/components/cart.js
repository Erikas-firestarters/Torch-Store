import React from 'react';
import {
  Button,
  Item,
  Grid,
  Icon,
  Label,
  Sticky,
  Container,
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
          <Item.Group divided>
            {cart.map(item => <CartItem key={item.id} item={item} />)}
          </Item.Group>
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
