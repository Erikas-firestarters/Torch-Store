import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../store';
import { Input, Menu, Button, Grid } from 'semantic-ui-react';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    {isLoggedIn ? (
      <div>
        {/* The navbar will show these links after you log in */}
        <NavLink to="/home">
          <Menu.Item name="home" />
        </NavLink>
        <a href="#" onClick={handleClick}>
          Logout
        </a>
      </div>
    ) : (
      <div>
        {/* The navbar will show these links before you log in */}
        <Grid columns="equal">
          <Menu top="true">
            <Grid.Column width={8}>
              <Menu.Menu position="left" fluid={'true'}>
                <Menu.Item>
                  <Input icon="search" placeholder="Search..." />
                </Menu.Item>
              </Menu.Menu>
            </Grid.Column>

            <Grid.Column width={1}>
              <Menu.Menu position="right">
                <NavLink to="/login">
                  <Menu.Item name="login" />
                </NavLink>
                <NavLink to="/signup">
                  <Menu.Item name="signup" />
                </NavLink>
              </Menu.Menu>
            </Grid.Column>
          </Menu>
        </Grid>
      </div>
    )}
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
