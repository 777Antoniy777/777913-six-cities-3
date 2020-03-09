/* eslint-disable no-console */
import ActionCreator from "./action-creator";

const transformJSON = (json) => {
  const obj = {};
  let val = ``;

  json.forEach((elem) => {
    for (let key in elem) {
      if (elem) {
        val = elem[key];

        if (key === `preview_image`) {
          elem.src = val;
          console.log(elem[key]);
          delete elem[key];
        }
        // console.log(key);
      }
    }
  });

  return json;
};

const AsyncActionCreator = {
  getOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        console.log(response);
        // console.log(transformJSON(response.data));
        dispatch(ActionCreator.getOffers(transformJSON(response.data)));
        // dispatch(ActionCreator.getOffers(response.data));
      })
      .catch(function (error) {
        console.log(error);
        throw error;
      });
  },
};

export default AsyncActionCreator;
