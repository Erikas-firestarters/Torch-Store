import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Rating, Input, TextArea, Segment } from 'semantic-ui-react';
import {postReview} from '../../store';
import history from '../../history';

class ReviewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      rating: '',
      dirty: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleRate (e, { rating }) {
    e.preventDefault();
    this.setState({ rating });
  }
  handleChange(e, type) {
    this.setState({ [type]: e.target.value, dirty: true });
  }
  resetComponent = () => this.setState({ title: '', content: '', rating: '', dirty: false })
  handleSubmit(e) {
    e.preventDefault();
    const newReview = {
      title: this.state.title,
      content: this.state.content,
      rating: this.state.rating,
      productId: this.props.id,
      userId: this.props.user.id
    }
    this.props.submitReview(newReview)
    this.resetComponent();
    this.props.resetReviews();
  }

  render() {
    return (
      <Segment padded textAlign="center">
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <Form.Group widths="equal">
        <Form.Field
          required
          control={Input}
          label="Title"
          placeholder="Title"
          onChange={(e) => this.handleChange(e, 'title')}
          value={this.state.title}
        />
        <Form.Field>
        <label>Rating</label>
        <Rating icon="star" maxRating={5} onRate={this.handleRate.bind(this)} />
        </Form.Field>
        </Form.Group>
        <Form.Field
          required
          control={TextArea}
          label="Review"
          placeholder="Review"
          width={16}
          onChange={(e) => this.handleChange(e, 'content')}
          value={this.state.content}
        />
        <Form.Field
          id="form-button-control-public"
          control={Button}
          content="Submit"
          disabled={!this.state.dirty}
        />
      </Form>
      </Segment>
    );
  }
}

const mapState = ({ user }) => ({ user, isLoggedIn: !!user.id });
const mapDispatch = dispatch => ({
  submitReview(review) {
    dispatch(postReview(review));
  },
});

export default connect(mapState, mapDispatch)(ReviewForm);

// export default ReviewForm;
