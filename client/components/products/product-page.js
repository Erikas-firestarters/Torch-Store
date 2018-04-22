import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Grid, Container, Header, Segment } from 'semantic-ui-react';
import ReviewList from './review-list';
import ProductForm, {
  ProductImg,
  ProductDescription,
} from './product-view-parts';
import Sidebar from '../sidebar';
import {fetchProduct} from '../../store';

class ProductPage extends Component {
  componentDidMount () {
    const {product, match} = this.props;
    if (product.id !== match.params.id) {
      this.props.fetchInitialData(this.props.match.params.id);
    }
  }
  render() {
    const cartHandler = () => {};
    const {product, match} = this.props;
    return (
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column width={2} stretched>
            <div className="sidebar">
              <Sidebar />
            </div>
          </Grid.Column>
          <Grid.Column width={13}>
            <div>
            <Container>
              <Segment.Group>
              <Segment clearing>
                <Header as="h2" floated="left" >{product.name}</Header>
                <Header as="h2" floated="right" >${product.price}</Header>
              </Segment>
              <Segment.Group horizontal>
              <Segment><ProductImg imageUrl={product.imageUrl} /></Segment>
              <Segment>
              <ProductDescription
                description={product.description}
              />
              <ProductForm product={product} cartHandler={cartHandler} />
              </Segment>

              </Segment.Group>
              </Segment.Group>
              <ReviewList productId={product.id ? product.id : match.params.id} />
              </Container>
              </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
const mapState = ({ product }) => ({ product });
const mapDispatch = dispatch => ({
  fetchInitialData(id) {
    dispatch(fetchProduct(id));
  },
});


export default connect(mapState, mapDispatch)(ProductPage);

