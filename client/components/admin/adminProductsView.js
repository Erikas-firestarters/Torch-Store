import React from 'react';
import { Header, List, Icon, Grid, Divider, Segment } from 'semantic-ui-react';
import AdminProductDetail from './adminProductDetail';
import AdminProductAddForm from './adminProductAddForm';

const viewCategories = categories => {
  if (!categories.length) return <span />
  return categories.map(category => (
  <List.Item key={categories.id}><Icon name="right triangle" />{category.name}</List.Item>)
  )
};

const AdminProductsView = props => {
  const { products } = props;
  return (
    <Grid.Column width={10}>
      <Segment>
        <Header>Add A Product</Header>
      <AdminProductAddForm />
      </Segment>
      <Header>Products List</Header>
      <Divider />
      {products &&
        products.map(product => (
          <Grid key={product.id} columns={2}>
            <Grid.Row>
              <Grid.Column width={6}>
                <List>
                  <List.Item>
                    <Header as="h3">{product.name}</Header>
                    <List.Header>Categories:</List.Header>
                    <List>{viewCategories(product.categories)}</List>
                  </List.Item>
                </List>
              </Grid.Column>
              <Grid.Column>
                <AdminProductDetail product={product} />
              </Grid.Column>
              <Divider />
            </Grid.Row>
          </Grid>
        ))}
    </Grid.Column>
  );
};

export default AdminProductsView;
