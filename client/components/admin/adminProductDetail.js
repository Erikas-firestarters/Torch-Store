import React, {Component} from 'react';
import {Button, Modal, Icon, Image} from 'semantic-ui-react';
import AdminProductForm from './adminProductForm.js'

class ProductDetail extends Component {
  constructor () {
    super()
    this.state = { modalOpen: false }
  }

  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })

  render() {
    const { product } = this.props;
      return (
    <Modal
      trigger={
        <Button icon color="pink" size="mini" onClick={this.handleOpen}>
          <Icon name="edit" />Edit
        </Button>}
      open={this.state.modalOpen}
      onClose={this.handleClose}>
      <Modal.Header>{product.name}</Modal.Header>
      <Modal.Content>
          <AdminProductForm product={product} closeFunc={this.handleClose} />
      </Modal.Content>
    </Modal>
  )
  }

};

export default ProductDetail;
