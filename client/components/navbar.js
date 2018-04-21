import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../store';
import { Input, Menu, Label, Sticky } from 'semantic-ui-react';
import SearchBar from './search';
const resultRenderer = ({ name }) => <Label content={name} />
const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    {isLoggedIn ? (
      <div>
        {/* The navbar will show these links after you log in */}
        <Menu>

          <Menu.Item>
            <img src="https://vignette.wikia.nocookie.net/elderscrolls/images/9/93/TESV_Torch.png/revision/latest?cb=20120619180715" />
          </Menu.Item>
            <Menu.Item as={NavLink} to="/products" name="Shop Torches" link />
          <Menu.Item>
            <SearchBar resultRenderer={resultRenderer} />
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item as={NavLink} to="/home" name="home" link />
            <Menu.Item name="logout" onClick={() => handleClick()} link />
            <Menu.Item as={NavLink} to="/cart" icon="cart" link />
          </Menu.Menu>
        </Menu>
      </div>
    ) : (
      <div>
        {/* The navbar will show these links before you log in */}
        <Menu>
          <Menu.Item>
            <img src="https://vignette.wikia.nocookie.net/elderscrolls/images/9/93/TESV_Torch.png/revision/latest?cb=20120619180715" />
          </Menu.Item>
          <Menu.Item as={NavLink} to="/products" name="Shop Torches" link />
          <Menu.Item>
            <SearchBar />
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item as={NavLink} to="/login" name="login" link />
            <Menu.Item as={NavLink} to="/signup" name="signup" link />
            <Menu.Item as={NavLink} to="/cart" icon="cart" link />
          </Menu.Menu>
        </Menu>
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

