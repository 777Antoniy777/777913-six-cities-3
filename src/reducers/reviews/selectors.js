const getRequestStatus = (state) => {
  return state.reviews.requestStatus;
};

const getRequestMessage = (state) => {
  return state.reviews.requestMessage;
};

const getReviews = (state) => {
  return state.reviews.reviews;
};

export {getRequestStatus, getRequestMessage, getReviews};
