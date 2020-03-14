const ReviewsActionType = {
  SET_REVIEWS_REQUEST_STATUS: `SET_REVIEWS_REQUEST_STATUS`,
  SET_REVIEWS_REQUEST_MESSAGE: `SET_REVIEWS_REQUEST_MESSAGE`,
  GET_REVIEWS: `GET_REVIEWS`,
};

const ReviewsActionCreator = {
  setReviewsRequestStatus: (status) => ({
    type: ReviewsActionType.SET_REVIEWS_REQUEST_STATUS,
    payload: status,
  }),

  setReviewsRequestMessage: (message) => ({
    type: ReviewsActionType.SET_REVIEWS_REQUEST_MESSAGE,
    payload: message,
  }),

  getReviews: (reviews) => ({
    type: ReviewsActionType.GET_REVIEWS,
    payload: reviews,
  }),
};

export {ReviewsActionType, ReviewsActionCreator};
