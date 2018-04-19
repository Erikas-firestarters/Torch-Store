import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Sidebar,
  Segment,
  Button,
  Menu,
  Image,
  Icon,
  Header,
} from 'semantic-ui-react';
import Routes from '../routes';
import ProductList from './product-list';
import { getCategories, setActiveCategory } from '../store';

class SidebarLeftPush extends Component {
  state = { visible: true };

  componentDidMount() {
    this.props.getCategories();
  }
  handleClick(category) {
    this.props.setActiveCategory(category);
  }
  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  render() {
    const { visible } = this.state;

    return (
      <div>
        {/* <Button onClick={this.toggleVisibility}>Toggle Categories</Button> */}
        {/* <Sidebar.Pushable as={Segment}> //this makes the sidebar 'push' animate away, but the main content is animated on a page load which is undesirable */}
          <Sidebar as={Menu} animation="push" width="thin" visible={visible} icon="labeled" vertical inverted>
            <Menu.Item onClick={() => this.handleClick(null)} name="home">
              <Icon name="home" />
              Show All
            </Menu.Item>
            {this.props.categories.map(category => (
              <Menu.Item onClick={() => this.handleClick(category.name)} key={category.id} name="gamepad">
                <Icon name="gamepad" />
                {category.name}
              </Menu.Item>
            ))}
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <Header as="h3">
                <Routes />
                <ProductList />
              </Header>
            </Segment>
          </Sidebar.Pusher>
        {/* </Sidebar.Pushable> */}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = ({ categories }) => ({ categories });

const mapDispatch = { getCategories, setActiveCategory };

export default connect(mapState, mapDispatch)(SidebarLeftPush);

SidebarLeftPush.propTypes = {
  // handleClick: PropTypes.func.isRequired
};
