/* eslint react/prefer-stateless-function: 0 class-methods-use-this:0*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Menu } from 'semantic-ui-react';
import { fetchUsers } from '../../store';
import AdminUsersView from './adminUsersView';
import AdminProductsView from './adminProductsView';
import AdminOrdersView from './adminOrdersView';


class AdminView extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  componentDidMount() {
    const users = this.props.users
		this.props.fetchInitialData(users);
	}

  render() {
    const { activeItem, users } = this.state;
    console.log(this.state.users);

    return (
      <div>
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
        <AdminUsersView users={users} />
        {activeItem === 'Products' && <AdminProductsView products={this.state.products} />}
        {activeItem === 'Orders' && <AdminOrdersView orders={this.state.orders} />}
        <Grid.Column stretched width={12} />
      </Grid>
      </div>
    );
  }
}

const mapState = ({ user, users, products, orders }) => ({
  user,
  users,
  products,
  orders,
  isLoggedIn: !!user.id,
  isAdmin: !!user.isAdmin
});

const mapDispatch = dispatch => ({
  fetchInitialData: () => {
    dispatch(fetchUsers());
    // dispatch(fetchProducts());
    // dispatch(fetchOrders());
  }
});

export default connect(mapState, mapDispatch)(AdminView);
