import React, { Component } from 'react';
import { Button, Segment, Form, Input, TextArea } from 'semantic-ui-react';
import {connect} from 'react-redux';
import {editProduct} from '../../store'

class AdminProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = props.product
  }
  handleChange = (event, key) => {
    this.setState({ [key]: event.target.value });
  }
  render() {
    const {handleSubmit } = this.props;
    const product = this.state;
    return (
      <Segment padded textAlign="center">
        <Form onSubmit={(e) => handleSubmit(e, product.id, product)}>
          <Form.Group widths="equal">
            <Form.Field
              required control={Input}
              label="name" placeholder="name"
              onChange={e => this.handleChange(e, 'name')}
              value={product.name}
            />
            <Form.Field
              required control={Input}
              label="imageUrl" placeholder="imageUrl"
              onChange={e => this.handleChange(e, 'imageUrl')}
              value={product.imageUrl}
            />
          </Form.Group>
          <Form.Group>
          <Form.Field
              required control={Input}
              label="price" placeholder="price"
              onChange={e => this.handleChange(e, 'price')}
              value={product.price}
            />
            <Form.Field
              required control={Input}
              label="inventory" placeholder="inventory"
              onChange={e => this.handleChange(e, 'inventory')}
              value={product.inventory}
            />
          </Form.Group>
          <Form.Field
            required
            control={TextArea}
            label="Description"
            placeholder="Description"
            width={16}
            onChange={e => this.handleChange(e, 'description')}
            value={product.description}
          />
          <Form.Field
            id="form-button-control-public"
            control={Button}
            content="Submit"

          />
        </Form>
      </Segment>
    );
  }
}


const mapState = ({products}) => ({products});
const mapDispatch = (dispatch, ownProps) => ({
  handleSubmit(e, id, product) {
    e.preventDefault();
    dispatch(editProduct(id, product));
    ownProps.closeFunc();
    // ownProps.history.push(`/campus/${id}`);
  },
});

export default connect(mapState, mapDispatch)(AdminProductForm);
