import {OffersActionCreator} from "./action-creator";

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

const OffersAsyncActionCreator = {
  getOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        response = createAdapter(response.data);

        dispatch(OffersActionCreator.getInitialOffers(response));
        dispatch(OffersActionCreator.getOffers(createAdapter(response.slice())));
        dispatch(OffersActionCreator.getInitialCity(response[0].city.name));
        dispatch(OffersActionCreator.setOffersRequestStatus(`success`));
        dispatch(OffersActionCreator.setOffersRequestMessage(null));
      })
      .catch(function (error) {
        console.log(error);
        dispatch(OffersActionCreator.setOffersRequestStatus(`error`));
        dispatch(OffersActionCreator.setOffersRequestMessage(`Ошибка загрузки предложений. Попробуйте позже`));

        throw error;
      });
  },
};

export {OffersAsyncActionCreator};
