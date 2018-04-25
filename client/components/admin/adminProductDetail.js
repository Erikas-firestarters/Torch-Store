import React, { Component } from 'react';
import { Button, Modal, Icon} from 'semantic-ui-react';
import {connect} from 'react-redux';
import AdminProductForm from './adminProductForm.js';
import {deleteProduct} from '../../store';


class ProductDetail extends Component {
  constructor() {
    super();
    this.state = { modalOpen: false };
  }

  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => this.setState({ modalOpen: false });

  render() {
    const { product, handleDelete } = this.props;
    return (
      <div>

        <Modal
          trigger={
            <Button icon color="green" size="mini" onClick={this.handleOpen}>
              <Icon name="edit" />Edit
            </Button>
          }
          open={this.state.modalOpen}
          onClose={this.handleClose}
        >
          <Modal.Header as="h2">{product.name}</Modal.Header>
          <Modal.Content>
            <AdminProductForm product={product} closeFunc={this.handleClose} />
          </Modal.Content>
        </Modal>
        <Button
          onClick={() => handleDelete(product.id)}
          color="red"
          size="mini"
        >
          <Icon name="delete" />
          Delete
        </Button>
      </div>
    );
  }
}

const mapState = ({ categories, products }) => ({ categories, products });
const mapDispatch = dispatch => ({
  handleDelete(id) {
    dispatch(deleteProduct(id));
  },
});


export default connect(mapState, mapDispatch)(ProductDetail);
