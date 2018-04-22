import React from 'react';
import { Header, List } from 'semantic-ui-react';

const AdminProductsView = props => {
  const { products } = props;
  return (
    <div>
      <Header>Products List</Header>
      <List divided relaxed>
        {products && products.map( product =>
          (<List.Item key={product.fullName}>
            <List.Content>
              <List.Header>{product.fullName}</List.Header>
              <List.Description>{product.id}</List.Description>
              <List.Description>{product.email}</List.Description>
              <List.Description>{product.isAdmin}</List.Description>
            </List.Content>
          </List.Item>)
        )}
      </List>
    </div>
  );
};

export default AdminProductsView;
