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
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation="push"
            width="thin"
            visible={visible}
            icon="labeled"
            vertical
            inverted
          >
            <Menu.Item name="home">
              <Icon name="home" />
              Torch Categories
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
              <Image src="/assets/images/wireframe/paragraph.png" />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
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
