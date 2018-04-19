import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import SidebarLeftPush from './sidebar';

const App = () => {
  return (
    <div>
      <Navbar />
      <SidebarLeftPush />
    </div>
  )
}

export default App
