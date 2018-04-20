/* eslint react/prefer-stateless-function: 0 class-methods-use-this:0*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Header, Image, Modal, Icon, Form, Divider } from 'semantic-ui-react';

class ProductDetail extends Component {
  constructor () {
    super();
    this.state = {
      quantity: 0,
    }
  }
  handleChange(e) {
    return this.setState({ quantity: e.target.value})
  }
  render() {
    return (
      <Modal trigger={<Button icon color="pink"><Icon name="magnify" /></Button>}>
        <Modal.Header>{this.props.product.name}</Modal.Header>
        <Modal.Content image>
          <Image
            wrapped
            size="large"
            src={this.props.product.photos[0].imageUrl}
          />
          <Modal.Description>
            <Header>${this.props.product.price}</Header>
            <p>{this.props.product.description}</p>
            <Divider />
            <Form size="big">
            <Form.Group widths="equal">
              <Form.Field
                onChange={this.handleChange}
                control="input"
                placeholder="Quantity"
              />
              <Button onClick={() => this.props.addCartItem(this.props.product)} icon color="teal" type="submit">
              <Icon  name="shopping cart" />
            </Button>
            </Form.Group>


          </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

const mapState = ({products}) => ({products});
const mapDispatch = (dispatch) => ({
  fetchInitialData() {
    dispatch(fetchProducts());
  }
})

export default connect(mapState, mapDispatch)(ProductDetail)

