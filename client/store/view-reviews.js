import axios from 'axios';

const GET_REVIEWS = 'GET_REVIEWS';

const defaultReviews = [];

const getReviews = reviews => ({ type: GET_REVIEWS, reviews });

export const fetchReviews = (productId) =>
  (dispatch) =>
    axios.get(`/api/products/${productId}/reviews`)
    .then(res => {
      dispatch(getReviews(res.data))
    })
    .catch(err => console.error(err))

  export default function (state = defaultReviews, action) {
    switch (action.type) {
      case GET_REVIEWS:
        return action.reviews;
      default:
        return state;
    }
  }
