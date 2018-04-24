/* eslint react/prefer-stateless-function: 0 class-methods-use-this:0*/

import React from 'react';
import { connect } from 'react-redux';
import { Label, Divider, Grid, Segment, Radio, Header, List, Modal, Button, Icon, Form } from 'semantic-ui-react';
import { updateUserInfo, deleteUserForever } from '../../store/admin';
import history from '../../history'

export class AdminUsersView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {openModal: false};

    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.opener = this.opener.bind(this);
    this.closer = this.opener.bind(this);
    this.checkbox = this.checkbox.bind(this);
    this.userModal = this.userModal.bind(this);
  }

  handleChange = (e, { value }) => this.setState({ value });
  opener = () => this.setState({openModal: true});
  closer = () => this.setState({openModal: false});

  render() {
    return (
      <div>
        <Header>User List</Header>

          {this.props.admin &&
            this.props.admin.map(user => (
              <Grid stackable key={user.id} columns={3}>
              <Grid.Row >
              <Grid.Column >
                {this.userModal(user)}
              </Grid.Column>
              <Grid.Column >
                  {user.isAdmin && <Label color={'red'}>Admin</Label>}
                </Grid.Column>
                <Grid.Column >
                <List.Header>
                  {user.fullName !== null &&
                    user.fullName !== 'null null' &&
                    user.fullName}
                </List.Header>
                <List.Description>{user.email}</List.Description>
              </Grid.Column>
                </Grid.Row>
                <Divider />
                </Grid>

            ))}

      </div>
    );
  }

  checkbox () {
    return (<Segment>
          <Form.Field>
          Allow Admin Access:
        </Form.Field>
        <Form.Field>
          <Radio
            label="Yes"
            name="radioGroup"
            value="true"
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label="No"
            name="radioGroup"
            value=""
            onChange={this.handleChange}
          />
        </Form.Field>
        </Segment>)
  }

  userModal (user) {
    return (<Modal
      align={'center'}
      trigger={<Button open={this.state.open} invert color={'teal'}>Edit User</Button>}
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
          <checkbox />
          <Modal.Actions>
            <Button color="green" type="submit" onClick={this.closer}>
            <Icon name="checkmark" />
            Commit Changes
            </Button>

            <Button
              onClick={() => this.props.deleteUserForever(user.id)}
              color="red">
              <Icon name="remove user" />
              Remove User
            </Button>
          </Modal.Actions>
        </Form>
      </Modal.Content>
    </Modal>)
  }

  onEditSubmit (event, id) {
    event.preventDefault();
    let adminValue;
    const { firstName, lastName, email, isAdmin } = event.target;
    // !this.state.value ? admin
    const updatedUser = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      isAdmin: !!this.state.value,
    };
    this.props.updateUserInfo(id, updatedUser);
  }
}

const mapState = ({admin}) => ({admin});
const mapDispatch = { updateUserInfo, deleteUserForever };
export default connect(mapState, mapDispatch)(AdminUsersView);
