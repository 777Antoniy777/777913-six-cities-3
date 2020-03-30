import {StartResponseProperty, EndResponseProperty} from "../../enums";
import {ReviewsActionCreator} from "./action-creator";

const setOptions = (comment, rating) => ({
  comment,
  rating,
});

const createAdapter = (json) => {
  const arr = [];
  let val = ``;

  json.forEach((obj) => {
    const newObj = {};

    for (let key in obj) {
      if (key) {
        val = obj[key];

        switch (key) {
          case StartResponseProperty.USER:
            const userObj = val;
            const newUserObj = {};
            let hostVal = ``;

            for (let userKey in userObj) {
              if (userKey) {
                hostVal = userObj[userKey];

                switch (userKey) {
                  case StartResponseProperty.IS_PRO:
                    newUserObj[EndResponseProperty.STATUS] = hostVal;
                    break;
                  case StartResponseProperty.AVATAR_URL:
                    newUserObj[EndResponseProperty.AVATAR] = hostVal;
                    break;
                  default:
                    newUserObj[userKey] = hostVal;
                    break;
                }

              }
            }

            newObj[StartResponseProperty.USER] = newUserObj;
            break;
          default:
            newObj[key] = val;
            break;
        }

      }
    }

    arr.push(newObj);
  });

  return arr;
};

const ReviewsAsyncActionCreator = {
  getReviews: (hotelId) => (dispatch, getState, api) => {
    return api.get(`/comments/${hotelId}`)
      .then((response) => {
        response = createAdapter(response.data);

        dispatch(ReviewsActionCreator.getReviews(response));
        dispatch(ReviewsActionCreator.setReviewsRequestStatus(`success`));
        dispatch(ReviewsActionCreator.setReviewsRequestMessage(null));
      })
      .catch(function (error) {
        dispatch(ReviewsActionCreator.setReviewsRequestStatus(`error`));
        dispatch(ReviewsActionCreator.setReviewsRequestMessage(`Ошибка загрузки комментариев. Попробуйте позже`));

        throw error;
      });
  },

  sendReview: (hotelId, comment, rating, onClearForm, onSetSubmitButtonStatus) => (dispatch, getState, api) => {
    const options = setOptions(comment, rating);

    return api.post(`/comments/${hotelId}`, options)
      .then((response) => {
        response = createAdapter(response.data);
        onClearForm();
        onSetSubmitButtonStatus(true);

        dispatch(ReviewsActionCreator.getReviews(response));
        dispatch(ReviewsActionCreator.setReviewsRequestStatus(`success`));
        dispatch(ReviewsActionCreator.setReviewsRequestMessage(null));
      })
      .catch(function (error) {
        onSetSubmitButtonStatus(false);

        dispatch(ReviewsActionCreator.setReviewsRequestStatus(`error`));
        dispatch(ReviewsActionCreator.setReviewsRequestMessage(`Невозможно отправить комментарий. Попробуйте позже`));

        throw error;
      });
  },
};

export {ReviewsAsyncActionCreator};
