/* eslint react/prefer-stateless-function: 0 class-methods-use-this:0*/

import React, { Component } from 'react';
import ProductItem from './product-item.js';

import { Grid } from 'semantic-ui-react';


const numProducts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
class ProductList extends Component {
  render() {
    return (
      <Grid>
        <Grid.Row columns={4} >
          {
            numProducts.map( elem => {
              return (
                <Grid.Column key={elem}>
                  <ProductItem />
                </Grid.Column>
              )
            })
          }
        </Grid.Row>
      </Grid>
    )
  }
}

export default ProductList;
