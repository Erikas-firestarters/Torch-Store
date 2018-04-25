import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, Icon, Grid } from 'semantic-ui-react';
import { addCategory } from '../../store';

const AdminCategoryForm = props => {
  const { handleSubmit } = props;
  return (
      <Form onSubmit={handleSubmit}>
        <Form.Group inline>
            <Form.Field required>
              <label>Category Name</label>
              <input name="catName" required />
            </Form.Field>
            <Form.Button
              id="form-button-control-public"
              color="teal"
              size="small"
              type="submit">
              <Icon name="checkmark" />
              Submit
            </Form.Button>
        </Form.Group>
      </Form>
  );
};
const mapState = null;
const mapDispatch = dispatch => ({
  handleSubmit(e) {
    e.preventDefault();
    let name = e.target.catName.value.trim();
    dispatch(addCategory({ name }));
    e.target.catName.value = '';
  },
});
export default connect(mapState, mapDispatch)(AdminCategoryForm);
