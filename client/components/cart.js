import React from 'react';
import { Button, Item, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { removeCartItem, updateCartItem } from '../store';
import { CartItem } from '../components';

function Cart(props) {
  const { cart, handleRemove, handleCartChange } = props;
  return (
    <Grid>
      <Grid.Column width={12}>
        <Item.Group divided>
          {cart.map(item => <CartItem key={item.id} item={item} />)}
        </Item.Group>
      </Grid.Column>
      <Grid.Column width={4}>
        <Button>CHECKOUT</Button>
      </Grid.Column>
    </Grid>
  );
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

export default connect(mapState, mapDispatch)(Cart);
