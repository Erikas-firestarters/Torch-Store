/* eslint react/prefer-stateless-function: 0 class-methods-use-this:0*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Menu, Header, Icon } from 'semantic-ui-react';
import { fetchUsers } from '../../store';
import AdminUsersView from './adminUsersView';
import AdminProductsView from './adminProductsView';
import AdminOrdersView from './adminOrdersView';


class AdminView extends Component {
  constructor() {
    super();
    this.state = { activeItem: 'Users' }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  componentDidMount(){
		this.props.fetchInitialData();
  }

  render() {
    const { activeItem, admin } = this.props;

    return (
      <div>
      <Header />
      <Header size={'huge'}>
        <Icon name="settings" size={'huge'} />
        <Header.Content>
        Admin Council
        </Header.Content>
      </Header>
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            <Menu.Item
              name="Users"
              active={activeItem === 'Users'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Products"
              active={activeItem === 'Products'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Orders"
              active={activeItem === 'Orders'}
              onClick={this.handleItemClick}
            />
          </Menu>
        </Grid.Column>
        {activeItem === 'Users' && <AdminUsersView admin={admin} />}
        {activeItem === 'Products' && <AdminProductsView products={this.state.products} />}
        {activeItem === 'Orders' && <AdminOrdersView orders={this.state.orders} />}
        <Grid.Column stretched width={12} />
      </Grid>
      </div>
    );
  }
}

const mapState = ({ user, admin, orders, products }) => ({
  user,
  admin,
  products,
  orders,
  isLoggedIn: !!user.id,
  isAdmin: !!user.isAdmin,
  activeItem: 'Users',
});

const mapDispatch = dispatch => ({
  fetchInitialData: () => {
    dispatch(fetchUsers())
  }
})

export default connect(mapState, mapDispatch)(AdminView);
