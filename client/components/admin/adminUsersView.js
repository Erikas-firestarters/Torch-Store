import React from 'react';
import { Header, List } from 'semantic-ui-react';

const AdminUsersView = props => {
  const { users } = props;
  return (
    <div>
      <Header>User List</Header>
      <List divided relaxed>
        {users && users.map( user =>
          (<List.Item key={user.fullName}>
            <List.Content>
              <List.Header>{user.fullName}</List.Header>
              <List.Description>{user.id}</List.Description>
              <List.Description>{user.email}</List.Description>
              <List.Description>{user.isAdmin}</List.Description>
            </List.Content>
          </List.Item>)
        )}
      </List>
    </div>
  );
};

export default AdminUsersView;
