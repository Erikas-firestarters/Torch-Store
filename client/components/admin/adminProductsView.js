import React from 'react';
import { Header, List } from 'semantic-ui-react';
import AdminProductDetail from './adminProductDetail';

const AdminProductsView = props => {
  const { products } = props;
  return (
    <div>
      <Header>Products List</Header>
      <List divided relaxed>
        {products && products.map( product =>
          (<List.Item key={product.id}>
            <List.Content>
              <List.Header>{product.name}</List.Header>
              <AdminProductDetail product={product} />
            </List.Content>
          </List.Item>)
        )}
      </List>
    </div>
  );
};

export default AdminProductsView;
