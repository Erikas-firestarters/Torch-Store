import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Item, Menu, Segment } from 'semantic-ui-react';
import { getCategories, setActiveCategory } from '../store';

class Sidebar extends Component {
  constructor () {
    super()
    this.state = {
      visible: true,
      activeItem: 'All Products',
    }
  }

  componentDidMount() {
    this.props.getCategories();
  }
  handleClick(category) {
    this.setState({activeItem: category.name || 'All Products'})
    this.props.setActiveCategory(category);
  }
  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  render() {
    const {activeItem} = this.state;
    return (
      <Menu vertical pointing fluid>
      <Menu.Item key="00" name="All Products" active={activeItem === 'All Products'} onClick={() => this.handleClick('')} />
        {
          this.props.categories.map(category => (
            <Menu.Item key={category.id} name={category.name} active={activeItem === category.name} onClick={() => this.handleClick(category)} />
          ))
        }


      </Menu>

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

// {this.props.categories.map(category => (
//   <Grid.column key={category.id}>
//   <Item onClick={() => this.handleClick(category.name)} >
//     <Item.Image size="tiny" src="/assets/images/wireframe/image.png" />
//     <Item.Content verticalAlign="middle">{category.name}</Item.Content>
//   </Item>
//   </Grid.column>))}
