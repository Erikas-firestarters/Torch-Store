import React from 'react';
import { Card, Icon, Image, Button } from 'semantic-ui-react';
import ProductDetail from './product-detail';

const ProductItem = props => {
  const { product, addItem } = props;
  console.log('ProductItem: addItem()', addItem)
  return (
    <div className="product-list-item">
      <Card raised>
        <Image src={product.imageUrl} />
        <Card.Content>
          <Card.Header>{product.name}</Card.Header>
          <Card.Meta>
            <span className="price">${product.price}</span>
            <Card.Meta>
              <ProductDetail addCartItem={addItem} product={product} />
              <Button onClick={() => addItem(product, 1)} icon color="teal" type="submit">
                <Icon name="shopping cart" />
              </Button>
            </Card.Meta>
          </Card.Meta>
        </Card.Content>
      </Card>
    </div>
  );
};

export default ProductItem;
