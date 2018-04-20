import React from 'react';
import { Card, Icon, Image, Button } from 'semantic-ui-react';
import ProductDetail from './product-detail';

const ProductItem = props => {
  const { product } = props;
  return (
    <div className="product-list-item">
      <Card raised>
        <Image src={product.photos[0].imageUrl} />
        <Card.Content>
          <Card.Header>{product.name}</Card.Header>
          <Card.Meta>
            <span className="price">${product.price}</span>
            <Card.Meta>
            <ProductDetail product={product} />
            <Button icon color="teal" type="submit">
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
