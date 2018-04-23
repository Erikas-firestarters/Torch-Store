import React from 'react';
import {
  Button,
  Item,
  Grid,
  Icon,
  Label,
  Sticky,
  Header,
  Card,
  Feed,
  List,
  Container,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import NumberFormat from 'react-number-format';

export const CheckoutOrderDetail = props => {
  const { cart, isOrder, handleOrderSubmit, subtotal } = props;

  return (
    <div>
      <List divided relaxed>
        <List.Header>Order Details:</List.Header>
        <List.Item>
          <List.Content>
            <List.Header>
              Sub Total:
              <NumberFormat
                floated="right"
                value={parseFloat(subtotal).toFixed(2)}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
              />
            </List.Header>
          </List.Content>
        </List.Item>
        <NavLink to="/checkout">
          <Button attached="bottom">
            <Icon name="cart" />
            Checkout
          </Button>
        </NavLink>
      </List>
    </div>
  );
};

const mapState = ({ cart, user }) => ({ cart, user });

const mapDispatch = null;

export default connect(mapState, mapDispatch)(CheckoutOrderDetail);
