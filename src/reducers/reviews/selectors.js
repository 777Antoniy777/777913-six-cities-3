const getReviewsRequestStatus = (state) => {
  return state.reviews.requestStatus;
};

const getReviewsRequestMessage = (state) => {
  return state.reviews.requestMessage;
};

const getReviews = (state) => {
  return state.reviews.reviews;
};

export {getReviewsRequestStatus, getReviewsRequestMessage, getReviews};
