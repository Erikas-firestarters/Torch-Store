import React from 'react';

import { Navbar, ProductList } from './components';
import Routes from './routes';
import Sidebar from './components/Sidebar';

const App = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <Routes />
      <ProductList />
    </div>
  );
};

export default App;
