import React from 'react';
import {Button, Modal, Icon} from 'semantic-ui-react';
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
        <Image wrapped size="large" src={product.imageUrl} />
        <Modal.Description>
          <AdminProductForm />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default ProductDetail;
