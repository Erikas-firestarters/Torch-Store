import React, { Component } from 'react';
import { Button, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { removeCartItem, updateCartItem } from '../store';

class CartItem extends Component {
  constructor(props) {
    super();
  }
  render() {
    const { item, handleRemove, handleCartChange } = this.props;
    return (
      <div className="ui segment">
        <img
          className="ui mini left floated image"
          src={item.photo}
        />
        <Input onChange={handleCartChange(item.id)} placeholder="0" value={item.quantity} />
        <p>{item.name}</p>
        <p>{item.price}</p>
        <Button color="red" onClick={() => handleRemove(item.id)}>
          X
        </Button>
      </div>
    );
  }
}

const mapState = ({ cart }) => ({ cart });

const mapDispatch = dispatch => {
  return {
    handleRemove(id) {
      dispatch(removeCartItem(id));
    },
    handleCartChange(e, id) {

      dispatch(updateCartItem(cartItem));
    },
  };
};

export default connect(mapState, mapDispatch)(CartItem);
