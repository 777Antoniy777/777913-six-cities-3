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
          case `user`:
            const userObj = val;
            const newUserObj = {};
            let hostVal = ``;

            for (let userKey in userObj) {
              if (userKey) {
                hostVal = userObj[userKey];

                switch (userKey) {
                  case `is_pro`:
                    newUserObj.status = hostVal;
                    break;
                  case `avatar_url`:
                    newUserObj.avatar = hostVal;
                    break;
                  default:
                    newUserObj[userKey] = hostVal;
                    break;
                }

              }
            }

            newObj.user = newUserObj;
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
  getReviewsOnGet: (hotelId) => (dispatch, getState, api) => {
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

  getReviewsOnPost: (hotelId, comment, rating, clearForm, setSubmitButtonStatus) => (dispatch, getState, api) => {
    const options = setOptions(comment, rating);

    return api.post(`/comments/${hotelId}`, options)
      .then((response) => {
        response = createAdapter(response.data);
        clearForm();
        setSubmitButtonStatus(true);

        dispatch(ReviewsActionCreator.getReviews(response));
        dispatch(ReviewsActionCreator.setReviewsRequestStatus(`success`));
        dispatch(ReviewsActionCreator.setReviewsRequestMessage(null));
      })
      .catch(function (error) {
        setSubmitButtonStatus(false);

        dispatch(ReviewsActionCreator.setReviewsRequestStatus(`error`));
        dispatch(ReviewsActionCreator.setReviewsRequestMessage(`Невозможно отправить комментарий. Попробуйте позже`));

        throw error;
      });
  },
};

export {ReviewsAsyncActionCreator};
