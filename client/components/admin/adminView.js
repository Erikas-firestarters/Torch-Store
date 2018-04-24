/* eslint react/prefer-stateless-function: 0 class-methods-use-this:0*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Menu, Header, Icon } from 'semantic-ui-react';
import { fetchUsers } from '../../store';
import AdminUsersView from './adminUsersView';
import AdminProductsView from './adminProductsView';
import AdminOrdersView from './adminOrdersView';
import AdminCategoriesView from './adminCategoriesView';

class AdminView extends Component {
  constructor() {
    super();
    this.state = { activeItem: 'Users' };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  componentDidMount() {
    this.props.fetchInitialData();
  }

  render() {
    const { admin, orders, products, categories } = this.props;

    return (
      <div className="admin">
        <Header />
        <Header size={'huge'}>
          <Icon name="settings" size={'huge'} margin-left={2} />
          <Header.Content>Admin Council</Header.Content>
        </Header>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <Menu fluid vertical tabular>
                <Menu.Item
                  name="Users"
                  active={this.state.activeItem === 'Users'}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name="Products"
                  active={this.state.activeItem === 'Products'}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name="Categories"
                  active={this.state.activeItem === 'Categories'}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name="Orders"
                  active={this.state.activeItem === 'Orders'}
                  onClick={this.handleItemClick}
                />
              </Menu>
            </Grid.Column>
            {this.state.activeItem === 'Users' && (
              <AdminUsersView admin={admin} />
            )}
            {this.state.activeItem === 'Products' && (
              <AdminProductsView products={products} />
            )}
            {this.state.activeItem === 'Orders' && (
              <AdminOrdersView orders={orders} />
            )}
            {this.state.activeItem === 'Categories' && (
              <AdminCategoriesView categories={categories} />
            )}
            <Grid.Column stretched width={12} />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapState = ({ user, admin, orders, products, categories }) => ({
  user,
  admin,
  products,
  orders,
  categories,
  isLoggedIn: !!user.id,
  isAdmin: !!user.isAdmin
});

const mapDispatch = dispatch => ({
  fetchInitialData: () => {
    dispatch(fetchUsers());
  }
});

export default connect(mapState, mapDispatch)(AdminView);
