import {UserReviewActionCreator} from "./action-creator";

const setOptions = (value) => ({
  value,
});

const UserReviewAsyncActionCreator = {
  getUserReview: (hotelId, comment) => (dispatch, getState, api) => {
    const options = setOptions(comment);

    return api.post(`/comments/${hotelId}`, options)
      .then((response) => {
        response = response.data;
        console.log(response);

        dispatch(UserReviewActionCreator.setUserReviewRequestStatus(`success`));
        dispatch(UserReviewActionCreator.setUserReviewRequestMessage(null));
        dispatch(UserReviewActionCreator.getUserReview(response));
      })
      .catch(function (error) {
        dispatch(UserReviewActionCreator.setUserReviewRequestStatus(`error`));
        dispatch(UserReviewActionCreator.setUserReviewRequestMessage(`Сервер недоступен. Невозможно оставить отзыв. Попробуйте позже`));

        throw error;
      });
  },
};

export {UserReviewAsyncActionCreator};
