import React, { Component } from 'react';
import {
  Button,
  Input,
  Item,
  Icon,
  Label,
  Dropdown,
  Grid,
  Form,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { removeCartItem, updateCartItem } from '../store';

class CartItem extends Component {
  constructor(props) {
    super();
  }
  render() {
    const { item, handleRemove, handleUpdate } = this.props;
    const options = [
      { key: 1, text: '1', value: 1 },
      { key: 2, text: '2', value: 2 },
      { key: 3, text: '3', value: 3 },
      { key: 4, text: '4', value: 4 },
      { key: 5, text: '5', value: 5 },
      { key: 6, text: '6', value: 6 },
      { key: 7, text: '7', value: 7 },
      { key: 8, text: '8', value: 8 },
      { key: 9, text: '9', value: 9 },
      { key: 10, text: '10+', value: 10 },
    ];
    return (
      <Item>
        {/* <Item.Image src={item.photos[0].imageUrl} /> */}
        <Item.Content>
          <Item.Header as="a">{item.name}</Item.Header>
          <Item.Meta>
            <Label tag color="teal">{`$ ${item.price}`}</Label>
          </Item.Meta>
          <Item.Description>{item.description}</Item.Description>
          <Item.Extra>
            <Grid>
              <Grid.Row>
                Quantity:
                {item.quantity < 10 ? (
                  <Grid.Column floated="left" width={1}>
                    <Dropdown
                      compact
                      selection
                      options={options}
                      value={item.quantity}
                      onChange={e =>
                        handleUpdate(item, parseFloat(e.target.textContent))
                      }
                    />
                  </Grid.Column>
                ) : (
                  <Grid.Column floated="left" width={1}>
                    <Form onSubmit={e => handleUpdate(item, e.target.value)}>
                      <Form.Group>
                        <Input size="tiny" />
                        <Button size="tiny">update</Button>
                      </Form.Group>
                    </Form>
                  </Grid.Column>
                )}
                <Grid.Column width={1} floated="right">
                  <Button.Group floated="right">
                    <Button
                      icon="remove"
                      floated="right"
                      color="red"
                      onClick={() => handleRemove(item.id)}
                    />
                  </Button.Group>
                </Grid.Column>
              </Grid.Row>
            </Grid>
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
    handleUpdate(cartItem, quantity) {
      // I was unable to access e.target.value and settled for a string e.target.textContent
      // because text of "10+", I have to do this check for NaN
      quantity = quantity ? quantity : 10;
      cartItem.quantity = quantity;
      cartItem.quantity
        ? dispatch(updateCartItem(cartItem))
        : dispatch(removeCartItem(cartItem.id));
    },
  };
};

export default connect(mapState, mapDispatch)(CartItem);
