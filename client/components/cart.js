import React from 'react';
import { Button, Item, Grid, Icon, Label, Sticky } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { CartItem } from '../components';
import { NavLink } from 'react-router-dom';
import NumberFormat from 'react-number-format';

function Cart(props) {
  const { cart } = props;
  const subTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
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
            <NavLink to="/checkout">
              <Button as="div" icon>
                <Icon name="cart" />
                Checkout
              </Button>
            </NavLink>
            <Label color="teal" basic pointing="left">
              <NumberFormat
                value={subTotal}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
              />
              {}
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
