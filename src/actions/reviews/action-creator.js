const ReviewsActionType = {
  SET_REVIEWS_REQUEST_STATUS: `SET_REVIEWS_REQUEST_STATUS`,
  SET_REVIEWS_REQUEST_MESSAGE: `SET_REVIEWS_REQUEST_MESSAGE`,
  GET_REVIEWS: `GET_REVIEWS`,
  SET_SUBMIT_BUTTON_STATUS: `SET_SUBMIT_BUTTON_STATUS`,
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

  setSubmitButtonStatus: (status) => ({
    type: ReviewsActionType.SET_SUBMIT_BUTTON_STATUS,
    payload: status,
  }),
};

export {ReviewsActionType, ReviewsActionCreator};
