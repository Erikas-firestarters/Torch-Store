import React from 'react';
import { Button, Item, Grid, Icon, Label, Sticky } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { removeCartItem, updateCartItem } from '../store';
import { CartItem } from '../components';

function Cart(props) {
  const { cart } = props;
  return (
    <Grid>
      <Grid.Column width={12}>
        <Item.Group divided>
          {cart.map(item => <CartItem key={item.id} item={item} />)}
        </Item.Group>
      </Grid.Column>
      <Grid.Column width={4}>
        <Sticky>
          <Button as="div" labelPosition="right">
            <Button icon>
              <Icon name="cart" />
              Checkout
            </Button>
            <Label as="a" basic pointing="left">
              {cart.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )}
            </Label>
          </Button>
        </Sticky>
      </Grid.Column>
    </Grid>
  );
}

const mapState = ({ cart }) => ({ cart });

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Cart);
