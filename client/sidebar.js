import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
import Routes from './routes'
import ProductList from './components/product-list'

export default class SidebarLeftPush extends Component {
  state = { visible: true }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    const { visible } = this.state
    let categories = [ //replace with categories from state
      'Analog',
      'Butane',
      'Tiki',
      'Caveman Retro'
    ]

    return (
      <div>
        {/* <Button onClick={this.toggleVisibility}>Toggle Categories</Button> */}
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation="push" width="thin" visible={visible} icon="labeled" vertical inverted>
            <Menu.Item name="home">
              <Icon name="home" />
              Torch Categories
            </Menu.Item>
            {categories.map((category, index) => (
              <Menu.Item key={index} name="gamepad">
                <Icon name="gamepad" />
                {category}
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
    )
  }
}

SidebarLeftPush.propTypes = {
  handleClick: PropTypes.func.isRequired
}
