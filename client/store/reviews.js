import axios from 'axios';

const GET_REVIEWS = 'GET_REVIEWS';
const ADD_REVIEWS = 'ADD_REVIEWS';

const defaultReviews = [];

const getReviews = reviews => ({ type: GET_REVIEWS, reviews });
const addReview = review => ({type: ADD_REVIEWS, review});

export const fetchReviews = (productId) =>
  (dispatch) =>
    axios.get(`/api/products/${productId}/reviews`)
    .then(res => {
      dispatch(getReviews(res.data))
    })
    .catch(err => console.error(err))

export const postReview = (review) =>
  (dispatch) =>
    axios.post(`/api/products/${review.productId}/reviews`, review)
    .then(res => {
      console.log(res.data)
      dispatch(addReview(res.data))
    })
    .catch(err => console.error(err))

  export default function (state = defaultReviews, action) {
    switch (action.type) {
      case GET_REVIEWS:
        return action.reviews;
      case ADD_REVIEWS:
        return [action.review, ...state];
      default:
        return state;
    }
  }
