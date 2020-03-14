import {ReviewsActionCreator} from "./action-creator";

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
  getReviews: (hotelId) => (dispatch, getState, api) => {
    return api.get(`/comments/${hotelId}`)
      .then((response) => {
        response = createAdapter(response.data);

        dispatch(ReviewsActionCreator.getReviews(response));
        dispatch(ReviewsActionCreator.setReviewsRequestStatus(`success`));
        dispatch(ReviewsActionCreator.setReviewsRequestMessage(null));
      })
      .catch(function (error) {
        console.log(error, error.message);
        dispatch(ReviewsActionCreator.setReviewsRequestStatus(`error`));
        dispatch(ReviewsActionCreator.setReviewsRequestMessage(`Ошибка загрузки комментариев. Попробуйте позже`));

        throw error;
      });
  },
};

export {ReviewsAsyncActionCreator};
