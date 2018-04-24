/* eslint react/prefer-stateless-function: 0 class-methods-use-this:0*/

import React from 'react';
import { connect } from 'react-redux';
import { Segment, Radio, Header, List, Modal, Button, Icon, Form } from 'semantic-ui-react';
import { updateUserInfo, deleteUserForever } from '../../store/admin';
import history from '../../history'

export class AdminUsersView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = (e, { value }) => this.setState({ value })
  opener = () => this.setState({open: true})
  closer = () => this.setState({open: false})

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
                  align={'center'}
                  trigger={<Button open={this.state.open} onCLose color={'teal'}>Edit User</Button>}
                  closeIcon>
                  <Header icon="user" content="Edit User" />
                  <Modal.Content>
                    <Form onSubmit={(e) => this.onEditSubmit(e, user.id)}>
                      <Form.Field>
                        <label>First Name</label>
                        <input name="firstName" defaultValue={user.firstName} />
                      </Form.Field>
                      <Form.Field>
                        <label>Last Name</label>
                        <input name="lastName" defaultValue={user.lastName} />
                      </Form.Field>
                      <Form.Field>
                        <label>Email</label>
                        <input name="email" defaultValue={user.email} />
                      </Form.Field>
        <Segment>
                      <Form.Field>
          Allow Admin Access: <b>{this.state.value}</b>
        </Form.Field>
        <Form.Field>
          <Radio
            label="Yes"
            name="radioGroup"
            value={true}
            checked={this.state.value === true}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label="No"
            name="radioGroup"
            value={false}
            checked={this.state.value === false}
            onChange={this.handleChange}
          />
        </Form.Field>
        </Segment>
                      <Modal.Actions>
                        <Button color="green" type="submit" onClick={this.closer}>
                          <Icon name="checkmark" /> Commit Changes
                        </Button >
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

  onEditSubmit (event, id) {
    event.preventDefault();
    const { firstName, lastName, email, isAdmin } = event.target;
    const updatedUser = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      isAdmin: this.state.value,
    };
    console.log('things being passed in, ', id.value);
    console.log('things being passed in, ', updatedUser);

this.props.updateUserInfo(id, updatedUser);
  }
}

const mapState = ({admin}) => ({admin});
const mapDispatch = { updateUserInfo, deleteUserForever };
export default connect(mapState, mapDispatch)(AdminUsersView);
