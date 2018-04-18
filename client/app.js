import React from 'react'

import {Navbar, ProductItem} from './components'
import Routes from './routes'


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <ProductItem />
    </div>
  )
}

export default App
