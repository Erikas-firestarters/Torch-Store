/* eslint react/prefer-stateless-function: 0 class-methods-use-this:0*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import ProductItem from './product-item.js';
import { fetchProducts } from '../store';

class ProductList extends Component {
  componentDidMount() {
    this.props.fetchInitialData();
  }
  render() {
    const {products, activeCategory} = this.props;
    return (
      <Grid>
        <Grid.Row columns={3} centered >
          { activeCategory.id ?
            products.filter( unFilteredProduct => ( unFilteredProduct.categoryId === activeCategory.id))
            .map(product => {
              return (
                <Grid.Column key={product.id}>
                  <ProductItem product={product} />
                </Grid.Column>
              )
            }) :
            products.map(product => (
                <Grid.Column key={product.id}>
                  <ProductItem product={product} />
                </Grid.Column>
              ))
          }
        </Grid.Row>
      </Grid>
    )
  }
}

const mapState = ({products, activeCategory}) => ({products, activeCategory});
const mapDispatch = (dispatch) => ({
  fetchInitialData() {
    dispatch(fetchProducts());
  }
})

export default connect(mapState, mapDispatch)(ProductList)
