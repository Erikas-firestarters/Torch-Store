import React from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { removeCartItem, updateCartItem } from '../store';
import {CartItem} from '../components';

function Checkout(props) {
  const { cart, handleRemove, handleCartChange } = props;
  return (
    <div className="ui grid">
      <div className="center aligned two column row">
        <div className="column">
          <h3 className="ui header">Cart</h3>

          {cart.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div className="column">
          <div className="ui segment">
            <Button>CHECKOUT</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapState = ({ cart }) => ({ cart });

const mapDispatch = dispatch => {
  return {
    handleRemove(e) {
    dispatch(removeCartItem(item.id))
    },
    handleCartChange(e) {
      console.log(e);
    },
  };
};

export default connect(mapState, mapDispatch)(Checkout);
