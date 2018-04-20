import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Divider, Button} from 'semantic-ui-react';

import { fetchReviews } from '../store';


class ReviewList extends Component {
  componentDidMount() {
    console.log(this.props.productId);
    this.props.fetchInitialData(this.props.productId);
    console.log('ReviewList', this.props.reviews)
  }
  render() {
    return (
      <div>
        <Button floated='right' color="teal">Read Reviews</Button>
        <Button floated='right' color="pink">Leave a Review</Button>
        <Divider clearing />
      </div>
    )
  }
}

const mapState = ({products, reviews}) => ({products, reviews});
const mapDispatch = (dispatch) => ({
  fetchInitialData(id) {
    dispatch(fetchReviews(id));
  }
})


export default connect(mapState, mapDispatch)(ReviewList)
