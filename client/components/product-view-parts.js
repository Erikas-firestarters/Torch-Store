import React, { Component } from 'react';
import { Image, Form, Header, Divider, Button, Icon } from 'semantic-ui-react';

export const ProductImg = props => (
  <Image wrapped size="large" src={props.imageUrl} />
);

export const ProductDescription = props => (
  <div>
    <Header>${props.price}</Header>
    <p>{props.description}</p>
    <Divider />
  </div>
);

class ProductForm extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({ quantity: e.target.value });
  }
  render() {
    return (
      <div>
        <Form size="big">
          <Form.Group widths="equal">
            <Form.Field
              onChange={this.handleChange}
              value={this.state.quantity}
              control="input"
              placeholder="Quantity"
            />
            <Button onClick={() => this.props.addCartItem(this.props.product)} icon color="teal" type="submit">
              <Icon name="shopping cart" />
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}
export default ProductForm;
