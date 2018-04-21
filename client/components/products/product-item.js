import React from 'react';
import { Card, Icon, Image, Button } from 'semantic-ui-react';
import ProductDetail from './product-detail';
import { connect } from 'react-redux';
import { addCartItem, updateCartItem } from '../../store';

const ProductItem = props => {
  const { product, cart, updateCartProduct, addProductToCart, isLoggedIn } = props;

  const cartHandler = (updatedProduct, quantity) => {
    let cartItem = cart.filter(prod => prod.id === updatedProduct.id);
    if (cartItem.length) {
      cartItem[0].quantity += quantity;
      console.log('carthandler', isLoggedIn);
      updateCartProduct(cartItem, isLoggedIn);
    } else {
      updatedProduct.quantity = Number(quantity);
      addProductToCart(updatedProduct, isLoggedIn);
    }
  };
  // console.log('ProductItem: addItem()', addItem)
  return (
    <div className="product-list-item">
      <Card raised>
        <Image src={product.imageUrl} />
        <Card.Content>
          <Card.Header>{product.name}</Card.Header>
          <Card.Meta>
            <span className="price">${product.price}</span>
            <Card.Meta>
              <ProductDetail cartHandler={cartHandler} product={product} />
              <Button
                onClick={() => cartHandler(product, 1)}
                icon
                color="teal"
                type="submit"
              >
                <Icon name="shopping cart" />
              </Button>
            </Card.Meta>
          </Card.Meta>
        </Card.Content>
      </Card>
    </div>
  );
};
const mapState = ({ user, cart }) => ({ cart, isLoggedIn: !!user.id });
const mapDispatch = dispatch => {
  return {
    addProductToCart(product, loggedIn) {
      dispatch(addCartItem(product, loggedIn));
    },
    updateCartProduct(product, loggedIn) {
      dispatch(updateCartItem(product, loggedIn));
    },
  };
};

export default connect(mapState, mapDispatch)(ProductItem);
