import React from 'react';
import {Rating, Grid, Segment} from 'semantic-ui-react';

const ReviewDetail = (props) => (
  <Segment>
  <Grid>
    <Grid.Row>
    <Grid.Column width={6}>
      <h4>{props.review.title}</h4>
      <Rating icon="star"
        defaultRating={props.review.rating}
        maxRating={5}
        disabled
      />
    </Grid.Column>
    <Grid.Column width={10}>
      <p>{props.review.content}</p>

    </Grid.Column>
    </Grid.Row>
  </Grid>
  </Segment>
);

export default ReviewDetail;
