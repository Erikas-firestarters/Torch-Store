import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Item
} from 'semantic-ui-react';
import { getCategories, setActiveCategory } from '../store';

class Sidebar extends Component {
  state = { visible: true };

  componentDidMount() {
    this.props.getCategories();
  }
  handleClick(category) {
    this.props.setActiveCategory(category);
  }
  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  render() {
    return (
      <div>
        <Item.Group divided>
          {this.props.categories.map(category => (
            <Item onClick={() => this.handleClick(category.name)} key={category.id}>
              <Item.Image size="tiny" src="/assets/images/wireframe/image.png" />
              <Item.Content verticalAlign="middle">{category.name}</Item.Content>
            </Item>))}
        </Item.Group>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = ({ categories }) => ({ categories });

const mapDispatch = { getCategories, setActiveCategory };

export default connect(mapState, mapDispatch)(Sidebar);

Sidebar.propTypes = {
  // handleClick: PropTypes.func.isRequired
};
