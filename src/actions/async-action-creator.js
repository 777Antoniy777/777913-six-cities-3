/* eslint-disable no-console */
import ActionCreator from "./action-creator";

const createAdapter = (json) => {
  const arr = [];
  let val = ``;

  json.forEach((obj) => {
    const newObj = {};

    for (let key in obj) {
      if (key) {
        val = obj[key];

        switch (key) {
          case `preview_image`:
            newObj.src = val;
            break;
          case `bedrooms`:
            newObj.bedroomAmount = val;
            break;
          case `max_adults`:
            newObj.guestsAmount = val;
            break;
          case `is_favorite`:
            newObj.favorite = val;
            break;
          case `is_premium`:
            newObj.premium = val;
            break;
          case `images`:
            newObj.photos = val;
            break;
          case `goods`:
            newObj.items = val;
            break;
          case `host`:
            const hostObj = val;
            const newHostObj = {};
            let hostVal = ``;

            for (let hostKey in hostObj) {
              if (hostKey) {
                hostVal = hostObj[hostKey];

                switch (hostKey) {
                  case `is_pro`:
                    newHostObj.status = hostVal;
                    break;
                  case `avatar_url`:
                    newHostObj.avatar = hostVal;
                    break;
                  default:
                    newHostObj[hostKey] = hostVal;
                    break;
                }

              }
            }

            newObj.host = newHostObj;
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

const AsyncActionCreator = {
  getOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        console.log(`offers:`, response);
        response = createAdapter(response.data);

        dispatch(ActionCreator.getInitialOffers(response));
        dispatch(ActionCreator.getOffers(createAdapter(response.slice())));
        dispatch(ActionCreator.getInitialCity(response[0].city.name));
      })
      .catch(function (error) {
        console.log(error);
        throw error;
      });
  },

  getComments: (hotelId) => (dispatch, getState, api) => {
    return api.get(`/comments/${hotelId}`)
      .then((response) => {
        console.log(`сomments:`, response.data);
        response = response.data;

        dispatch(ActionCreator.getComments(response));
      })
      .catch(function (error) {
        console.log(error);
        throw error;
      });
  },
};

export default AsyncActionCreator;
