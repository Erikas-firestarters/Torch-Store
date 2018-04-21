/* eslint react/prefer-stateless-function: 0 class-methods-use-this:0*/
import React, { Component } from 'react';
import ReviewList from './review-list';
import ProductForm, {ProductImg, ProductDescription }  from './product-view-parts';
import { Button, Modal, Icon} from 'semantic-ui-react';

const ProductDetail = (props) => {
    const {cartHandler, product} = props
    return (
      <Modal trigger={<Button icon color="pink"><Icon name="magnify" /></Button>}>
        <Modal.Header>{product.name}</Modal.Header>
        <Modal.Content image>
          <ProductImg imageUrl={product.imageUrl} />
          <Modal.Description>
             <ProductDescription
              price={product.price}
              description={product.description}
            />
            <ProductForm product={product} cartHandler={cartHandler} />
          </Modal.Description>
        </Modal.Content>
        <Modal.Content>
        <ReviewList productId={product.id} />
        </Modal.Content>
      </Modal>
    );
  }

export default ProductDetail

