import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Divider, Button, Segment } from 'semantic-ui-react';
import ReviewDetail from './review-detail';
import ReviewForm from './review-form';
import { fetchReviews } from '../../store';

class ReviewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showReviews: true,
      showReviewForm: false,
    };
  }
  componentDidMount() {
    this.props.fetchInitialData(this.props.productId);
  }
  showReviews(e) {
    e.preventDefault();
    this.setState({
      showReviews: !this.state.showReviews,
      showReviewForm: false
    });
  }
  showReviewForm(e) {
    e.preventDefault();
    this.setState({
      showReviewForm: !this.state.showReviewForm,
      showReviews: false,
    });
  }

  render() {
    const { reviews, isLoggedIn } = this.props;
    return (
      <div>
        {reviews.length ?
          <Button floated="right" color="teal"
            onClick={this.showReviews.bind(this)}>Read Reviews</Button>
            : <span />
        }
        { isLoggedIn &&
        <Button floated="right" color="pink"
        onClick={this.showReviewForm.bind(this)}>Leave a Review</Button>
        }
        <Divider clearing hidden />
        {this.state.showReviews &&
        <Segment padded >
          <h2>Reviews</h2>
          <Segment.Group>
            {reviews.map(review => (
              <ReviewDetail key={review.id} review={review} />
            ))}
          </Segment.Group>
          </Segment>
        }

        {this.state.showReviewForm && <ReviewForm /> }

      </div>
    );
  }
}

const mapState = ({ products, reviews, user }) => ({ products, reviews, isLoggedIn: !!user.id });
const mapDispatch = dispatch => ({
  fetchInitialData(id) {
    dispatch(fetchReviews(id));
  },
});

export default connect(mapState, mapDispatch)(ReviewList);
