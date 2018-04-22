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
  const { cart, isOrder, handleOrderSubmit } = props;
  const subTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return (
    <div>
      <List divided relaxed>
          <Button as={NavLink} to="/cart" attached="top">
            <Icon name="cart" />
            edit cart
          </Button>
          <List.Header>Order Details:</List.Header>
          <List.Item>
            <List.Content>
              <List.Header>
                Sub Total:
                <NumberFormat
                  floated="right"
                  value={parseFloat(subTotal).toFixed(2)}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$'}
                />
              </List.Header>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>
                Tax:
                <NumberFormat
                  value={parseFloat(subTotal * 0.1).toFixed(2)}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$'}
                />
              </List.Header>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>
                Total:
                <NumberFormat
                  value={parseFloat(subTotal * 1.1).toFixed(2)}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$'}
                />
              </List.Header>
            </List.Content>
          </List.Item>
          <Button fluid attached="bottom" onSubmit={handleOrderSubmit}>
            Process order
          </Button>
      </List>
    </div>
  );
};

const mapState = ({ cart, user }) => ({ cart, user });

const mapDispatch = null;

export default connect(mapState, mapDispatch)(CheckoutOrderDetail);
