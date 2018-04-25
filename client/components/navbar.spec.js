/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {NavBar} from './NavBar'

const adapter = new Adapter()
enzyme.configure({adapter})

describe.only('NavBar', () => {
  let navBar

  beforeEach(() => {
    navBar = shallow(<NavBar isLoggedIn={true} />)
  })

  xit('shows the logout link when logged in', () => {
    expect(navBar.find('[name="logout"]').to.have.length(1)
    )
  })
})
