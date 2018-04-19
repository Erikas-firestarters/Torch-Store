import React from 'react'

import {Navbar, ProductList} from './components'
import Routes from './routes'


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <ProductList />
    </div>
  )
}

export default App
