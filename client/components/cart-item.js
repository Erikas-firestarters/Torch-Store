import React, { Component } from 'react';
import { Button, Input, Item, Icon, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { removeCartItem, updateCartItem } from '../store';

class CartItem extends Component {
  constructor(props) {
    super();
  }
  render() {
    const { item, handleRemove, handleUpdate } = this.props;
    return (
      <Item>
        <Item.Image src={item.photos[0].imageUrl} />
        <Item.Content>
          <Item.Header as="a">{item.name}</Item.Header>
          <Item.Meta>
            <Label tag color="teal">{`$${item.price}`}</Label>
          </Item.Meta>
          <Item.Description>{item.description}</Item.Description>
          <Item.Extra>
              <Icon>
            {`Qty: ${item.quantity}`}
            </Icon>
            <Button.Group floated="right">
              <Button
                icon="plus"
                floated="right"
                color="green"
                onClick={() => handleUpdate(true, item)}
              />
              <Button
                icon="minus"
                floated="right"
                color="yellow"
                onClick={() => handleUpdate(false, item)}
              />
              <Button
                icon="remove"
                floated="right"
                color="red"
                onClick={() => handleRemove(item.id)}
              />
            </Button.Group>
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  }
}

const mapState = ({ cart }) => ({ cart });

const mapDispatch = dispatch => {
  return {
    handleRemove(id) {
      dispatch(removeCartItem(id));
    },
    handleUpdate(increment, cartItem) {
      const change = increment ? 1 : -1;
      cartItem.quantity += change;
      cartItem.quantity
        ? dispatch(updateCartItem(cartItem))
        : dispatch(removeCartItem(cartItem.id));
    },
  };
};

export default connect(mapState, mapDispatch)(CartItem);
