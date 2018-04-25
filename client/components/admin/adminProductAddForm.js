import React, { Component } from 'react';
import { Button, Segment, Form, Input, TextArea } from 'semantic-ui-react';
import {connect} from 'react-redux';
import {postProduct} from '../../store'

const AdminProductAddForm = (props) => {
    const {handleSubmit } = props;
    return (
      <Segment padded textAlign="center">
        <Form onSubmit={handleSubmit}>
          <Form.Group widths="equal">
            <Form.Field
              required control={Input}
              name="name"
              label="name" placeholder="name"
            />
            <Form.Field
              control={Input} name="imageUrl"
              label="imageUrl" placeholder="imageUrl"
            />
          </Form.Group>
          <Form.Group>
          <Form.Field
              required control={Input}
              name="price"
              label="price" placeholder="price"
            />
            <Form.Field
              required control={Input} name="inventory"
              label="inventory" placeholder="inventory"
            />
          </Form.Group>
          <Form.Field
            required
            control={TextArea}
            label="Description"
            name="description"
            placeholder="Description"
            width={16}
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


const mapState = ({products}) => ({products});
const mapDispatch = (dispatch) => ({
  handleSubmit(e) {
    e.preventDefault();
    if (!e.target.imageUrl.value) {
      dispatch(postProduct({
        name: e.target.name.value,
        price: +e.target.price.value,
        inventory: +e.target.inventory.value,
        description: e.target.description.value,
      }));
    }
    else {
      dispatch(postProduct({
      name: e.target.name.value,
      imageUrl: e.target.imageUrl.value,
      price: +e.target.price.value,
      inventory: +e.target.inventory.value,
      description: e.target.description.value,
    }))
  }
},

});

export default connect(mapState, mapDispatch)(AdminProductAddForm);
