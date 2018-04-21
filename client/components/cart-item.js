import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { removeCartItem, updateCartItem } from '../store';

class CartItem extends Component {
  constructor(props) {
    super();
  }
  render() {
    const { item, handleRemove } = this.props;
    return (
      <div className="ui segment">
        <img
          className="ui mini left floated image"
          src="https://semantic-ui.com/images/wireframe/image.png"
        />
        <p>{item.name}</p>
        <p>{item.price}</p>
        <Button color="red" onClick={() => handleRemove(item.id)}>
          X
        </Button>
      </div>
    );
  }
}

const mapState = null;

const mapDispatch = dispatch => {
  return {
    handleRemove(id) {
      dispatch(removeCartItem(id));
    },
    handleCartChange(e) {
      console.log(e);
    },
  };
};

export default connect(mapState, mapDispatch)(CartItem);
