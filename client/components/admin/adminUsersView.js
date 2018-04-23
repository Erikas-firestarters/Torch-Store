/* eslint react/prefer-stateless-function: 0 class-methods-use-this:0*/

import React from 'react';
import { connect } from 'react-redux';
import { Header, List, Modal, Button, Icon, Form } from 'semantic-ui-react';
import { updateUserInfo, deleteUserForever } from '../../store/admin';
import history from '../../history'

export class AdminUsersView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onEditSubmit = this.onEditSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <Header>User List</Header>
        <List divided relaxed>
          {this.props.admin &&
            this.props.admin.map(user => (
              <List.Item key={user.id}>
                <List.Content>
                  <List.Header>
                    {user.fullName !== null &&
                      user.fullName !== 'null null' &&
                      user.fullName}
                  </List.Header>
                  <List.Description>{user.email}</List.Description>
                  <List.Description>{user.isAdmin && 'Admin'}</List.Description>
                </List.Content>
                <Modal
                  trigger={<Button color={'teal'}>Edit User</Button>}
                  closeIcon>
                  <Header icon="user" content="Edit User" />
                  <Modal.Content>
                    <Form onSubmit={this.onEditSubmit}>
                      <Form.Field>
                        <label>Id</label>
                        <input readOnly name="id" value={user.id} />
                      </Form.Field>
                      <Form.Field>
                        <label>Name</label>
                        <input name="fullName" defaultValue={user.fullName} />
                      </Form.Field>
                      <Form.Field>
                        <label>Email</label>
                        <input name="email" defaultValue={user.email} />
                      </Form.Field>
                      <Form.Field>
                        <label>Admin Access</label>
                        <input name="isAdmin" defaultValue={user.isAdmin} />
                      </Form.Field>
                      <Modal.Actions>
                        <Button color="green" type="submit">
                          <Icon name="checkmark" /> Commit Changes
                        </Button>
                        <Button
                          onClick={() => {
                            this.props.deleteUserForever(user.id)}
                          }
                          color="red">
                          <Icon name="remove user" /> Remove User
                        </Button>
                      </Modal.Actions>
                    </Form>
                  </Modal.Content>
                </Modal>
              </List.Item>
            ))}
        </List>
      </div>
    );
  }

  onEditSubmit = event => {
    event.preventDefault();
    const { fullName, email, isAdmin, id } = event.target;
    const updatedUser = {
      fullName: fullName.value,
      email: email.value,
      isAdmin: isAdmin.value
    };
    updateUserInfo(id.value, updatedUser);
  };
}

const mapState = ({admin}) => ({admin});
const mapDispatch = { updateUserInfo, deleteUserForever };
export default connect(mapState, mapDispatch)(AdminUsersView);
