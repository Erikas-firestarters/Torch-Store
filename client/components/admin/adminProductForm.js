import React, { Component } from 'react';
import { Button, Segment, Form, Input, TextArea } from 'semantic-ui-react';
import {connect} from 'react-redux';

class AdminProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = props.product;
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(key, event) {
    this.setState({ [key]: event.target.value });
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
              onChange={e => this.handleChange(e, 'title')}
              value={this.state.title}
            />
            <Form.Field>
              <label>Rating</label>
              <Rating
                icon="star"
                maxRating={5}
                onRate={this.handleRate.bind(this)}
              />
            </Form.Field>
          </Form.Group>
          <Form.Field
            required
            control={TextArea}
            label="Review"
            placeholder="Review"
            width={16}
            onChange={e => this.handleChange(e, 'content')}
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


const mapState = null;
const mapDispatch = (dispatch, ownProps) => ({
  handleSubmit(id, event) {
    const campus = {
      name: event.target.name.value,
      imageUrl: event.target.imageUrl.value,
      description: event.target.description.value,
    };
    event.preventDefault();
    dispatch(pos(id, campus));
    ownProps.history.push(`/campus/${id}`);
  },
});

export default connect(mapState, mapDispatch)(AdminProductForm);
