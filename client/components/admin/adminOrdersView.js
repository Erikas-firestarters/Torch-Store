import React from 'react';
import { Header, List } from 'semantic-ui-react';

const AdminOrdersView = props => {
  const { orders } = props;
  return (
    <div>
      <Header>Orders List</Header>
      <List divided relaxed>
        {orders && orders.map( order =>
          (<List.Item key={order.fullName}>
            <List.Content>
              <List.Header>{order.fullName}</List.Header>
              <List.Description>{order.id}</List.Description>
              <List.Description>{order.email}</List.Description>
              <List.Description>{order.isAdmin}</List.Description>
            </List.Content>
          </List.Item>)
        )}
      </List>
    </div>
  );
};

export default AdminOrdersView;
