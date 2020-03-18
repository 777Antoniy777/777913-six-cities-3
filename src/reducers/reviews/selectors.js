const getReviewsRequestStatus = (state) => {
  return state.reviews.requestStatus;
};

const getReviewsRequestMessage = (state) => {
  return state.reviews.requestMessage;
};

const getReviews = (state) => {
  return state.reviews.reviews;
};

const getSubmitButtonStatus = (state) => {
  return state.reviews.submitButtonStatus;
};

export {getReviewsRequestStatus, getReviewsRequestMessage, getReviews, getSubmitButtonStatus};
