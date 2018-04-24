import React from 'react';
import {Button, Modal, Icon, Image} from 'semantic-ui-react';
import AdminProductForm from './adminProductForm.js'

const ProductDetail = props => {
  const { product } = props;
  return (
    <Modal
      trigger={
        <Button icon color="pink" size="mini">
          <Icon name="edit" />Edit
        </Button>
      }
    >
      <Modal.Header>{product.name}</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <AdminProductForm product={product} />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default ProductDetail;
