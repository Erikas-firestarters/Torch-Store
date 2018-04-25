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
  Card,
  Image,
  Header,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { removeCartItem, updateCartItem } from '../store';

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.item.quantity,
    };
  }
  handleFieldQuantityChange = e => {
    const { isLoggedIn, item } = this.props;
    const quantity = Number(e.target.quantity.value);
    this.props.handleDispatchUpdate(item, quantity, isLoggedIn);
  };
  handleDropdownQuantityChange = (e, { value }) => {
    const { isLoggedIn, item } = this.props;
    const quantity = value ? value : e.target.value;
    this.props.handleDispatchUpdate(item, quantity, isLoggedIn);
  };

  render() {
    const { item, handleRemove, isLoggedIn, isCheckout } = this.props;
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
      <Grid celled="externally">
        <Grid.Row centered>
          <Grid.Column width={4}>
            <Header as="h4">{item.name}</Header>
          </Grid.Column>
          <Grid.Column width={10}>
            <Header as="h4">Description:</Header>
          </Grid.Column>
          <Grid.Column width={2}>
            <Header as="h4">Quantity:</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <Image src={item.imageUrl} size="small" />
          </Grid.Column>
          <Grid.Column width={10}>{item.description}</Grid.Column>
          <Grid.Column width={2}>
            {item.quantity < 10 ? (
              <Dropdown
                floated="right"
                compact
                selection
                options={options}
                value={item.quantity}
                onChange={this.handleDropdownQuantityChange}
              />
            ) : (
              <Form
                size="large"
                floated="right"
                onSubmit={this.handleFieldQuantityChange}
              >
                <Form.Field
                  control="input"
                  placeholder={item.quantity}
                  name="quantity"
                />
                <Button size="mini" type="submit">
                  update
                </Button>
              </Form>
            )}
            <Grid.Row>
              {/* <Button.Group floated="bottom"> */}
                <Button
                  fitted
                  compact
                  size="mini"
                  color="red"
                  floated="bottom"
                  onClick={() => handleRemove(item, isLoggedIn)}
                >
                 remove
                </Button>
              {/* </Button.Group> */}
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapState = ({ cart, user }) => ({ cart, isLoggedIn: !!user.id });

const mapDispatch = dispatch => {
  return {
    handleRemove(cartItem, isLoggedIn) {
      dispatch(removeCartItem(cartItem, isLoggedIn));
    },
    handleDispatchUpdate(cartItem, quantity, isLoggedIn) {
      cartItem.quantity = quantity;
      cartItem.quantity
        ? dispatch(updateCartItem(cartItem, isLoggedIn))
        : dispatch(removeCartItem(cartItem, isLoggedIn));
    },
  };
};

export default connect(mapState, mapDispatch)(CartItem);
