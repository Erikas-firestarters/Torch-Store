import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Navbar} from './components';
import Routes from './routes';

const App = () => {
  return (
    <div>
      <Navbar />
      <Grid>
        <Grid.Row>
        <Grid.Column width={16} >
          <div className="main">
            <Routes />
          </div>
        </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default App;
