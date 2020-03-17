const UserReviewActionType = {
  SET_USER_REVIEW_REQUEST_STATUS: `SET_USER_REVIEW_REQUEST_STATUS`,
  SET_USER_REVIEW_REQUEST_MESSAGE: `SET_USER_REVIEW_REQUEST_MESSAGE`,
  GET_USER_REVIEW: `GET_USER_REVIEW`,
};

const UserReviewActionCreator = {
  setUserReviewRequestStatus: (status) => ({
    type: UserReviewActionType.SET_USER_REVIEW_REQUEST_STATUS,
    payload: status,
  }),

  setUserReviewRequestMessage: (message) => ({
    type: UserReviewActionType.SET_USER_REVIEW_REQUEST_MESSAGE,
    payload: message,
  }),

  getUserReview: (review) => ({
    type: UserReviewActionType.GET_USER_REVIEW,
    payload: review,
  }),
};

export {UserReviewActionType, UserReviewActionCreator};
