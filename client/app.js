import React from 'react'

import {Navbar, ProductList} from './components'
import Routes from './routes'
import SidebarLeftPush from './components/sidebarleftpush';

const App = () => {
  return (
    <div>
      <Navbar />
      <SidebarLeftPush />
    </div>
  )
}

export default App
