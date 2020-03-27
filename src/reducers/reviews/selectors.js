import {createSelector} from "reselect";

const getReviewsRequestStatus = (state) => {
  return state.reviews.requestStatus;
};

const getReviewsRequestMessage = (state) => {
  return state.reviews.requestMessage;
};

const getReviews = (state) => {
  return state.reviews.reviews;
};

const getReviewsSelector = createSelector(
    getReviews,
    (reviews) => {
      return reviews.sort((left, right) => {
        const actualDateLeft = new Date(left.date);
        const actualDateRight = new Date(right.date);

        return actualDateRight - actualDateLeft;
      });
    }
);

export {getReviewsRequestStatus, getReviewsRequestMessage, getReviews, getReviewsSelector};
