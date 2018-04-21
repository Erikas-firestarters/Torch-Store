import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Rating, Input, TextArea, Segment } from 'semantic-ui-react';

class ReviewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      rating: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleRate (e, { rating }) {
    e.preventDefault();
    this.setState({ rating });
  }
  handleChange(e, type) {
    this.setState({ [type]: e.target.value });
  }

  render() {
    console.log(this.state);
    return (
      <Segment padded textAlign="center">
      <Form>
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
        />
      </Form>
      </Segment>
    );
  }
}

// const mapState = ({ products, reviews, user }) => ({ products, reviews, isLoggedIn: !!user.id });
// const mapDispatch = dispatch => ({
//   fetchInitialData() {
//     dispatch();
//   },
// });

// export default connect(mapState, mapDispatch)(ReviewForm);

export default ReviewForm;
