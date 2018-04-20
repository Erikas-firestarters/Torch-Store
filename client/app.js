import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Navbar, ProductList, Cart } from './components';
import Routes from './routes';
import Sidebar from './components/Sidebar';

const App = () => {
  return (
    <div>
      <Navbar />
      <Grid columns={2}>
        <Grid.Row>
        <Grid.Column width={2} stretched>
          <div className="sidebar">
            <Sidebar />
          </div>
        </Grid.Column>
        <Grid.Column width={14} >
          <div className="main">
            <Routes />
            <Cart />
            <ProductList />
          </div>
        </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default App;
