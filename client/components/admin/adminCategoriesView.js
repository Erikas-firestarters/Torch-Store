import React from 'react';
import { connect } from 'react-redux';
import { Grid, Divider, Button, Header, List, Segment } from 'semantic-ui-react';
import { removeCategory } from '../../store';
import AdminCategoryForm from './adminCategoryForm';
import {capitalize} from '../../../server/utils/helperFunctions';

const countAllItems = (products, catId) => {
  const findCategoryMatch = product => {
    let match = elem => elem.id === catId;
    return product.categories.some(match);
  };
  let count = 0;
  products.forEach(product => {
    if (findCategoryMatch(product)) count++;
  });
  return count;
};

const AdminCategoriesView = props => {
  const { categories, handleDelete, products } = props;
  return (
    <Grid.Column width={8}>
      <Segment>
        <Header>Add A Category</Header>
          <AdminCategoryForm />
      </Segment>
      <Header>Category List</Header>
      <Divider />
      {categories.map(category => (
        <Grid key={category.id} columns={2}>
          <Grid.Row>
            <Grid.Column>
              <List>
                <List.Item>
                  <List.Header>{capitalize(category.name)}</List.Header>
                  <List.Item>
                    {countAllItems(products, category.id)} Products
                  </List.Item>
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column>
              <Button
                onClick={() => handleDelete(category.id)}
                color="pink"
                size="mini"
              >
                Delete Category
              </Button>
            </Grid.Column>
            <Divider />
          </Grid.Row>
        </Grid>
      ))}
    </Grid.Column>
  );
};

const mapState = ({ categories, products }) => ({ categories, products });
const mapDispatch = dispatch => ({
  handleDelete(id) {
    dispatch(removeCategory(id));
  },
});

export default connect(mapState, mapDispatch)(AdminCategoriesView);
