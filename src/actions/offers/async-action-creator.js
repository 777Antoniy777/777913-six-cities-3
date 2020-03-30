import {StartResponseProperty, EndResponseProperty} from "../../enums";
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
          case StartResponseProperty.PREVIEW_IMAGE:
            newObj[EndResponseProperty.SRC] = val;
            break;
          case StartResponseProperty.BEDROOMS:
            newObj[EndResponseProperty.BEDROOM_AMOUNT] = val;
            break;
          case StartResponseProperty.MAX_ADULTS:
            newObj[EndResponseProperty.GUESTS_AMOUNT] = val;
            break;
          case StartResponseProperty.IS_FAVORITE:
            newObj[EndResponseProperty.FAVORITE] = val;
            break;
          case StartResponseProperty.IS_PREMIUM:
            newObj[EndResponseProperty.PREMIUM] = val;
            break;
          case StartResponseProperty.IMAGES:
            newObj[EndResponseProperty.PHOTOS] = val;
            break;
          case StartResponseProperty.GOODS:
            newObj[EndResponseProperty.ITEMS] = val;
            break;
          case StartResponseProperty.HOST:
            const hostObj = val;
            const newHostObj = {};
            let hostVal = ``;

            for (let hostKey in hostObj) {
              if (hostKey) {
                hostVal = hostObj[hostKey];

                switch (hostKey) {
                  case StartResponseProperty.IS_PRO:
                    newHostObj[EndResponseProperty.STATUS] = hostVal;
                    break;
                  case StartResponseProperty.AVATAR_URL:
                    newHostObj[EndResponseProperty.AVATAR] = hostVal;
                    break;
                  default:
                    newHostObj[hostKey] = hostVal;
                    break;
                }

              }
            }

            newObj[StartResponseProperty.HOST] = newHostObj;
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
        dispatch(OffersActionCreator.getOffers(response));
        dispatch(OffersActionCreator.getInitialCity(response[0].city.name));
        dispatch(OffersActionCreator.setOffersRequestStatus(`success`));
        dispatch(OffersActionCreator.setOffersRequestMessage(null));
      })
      .catch(function (error) {
        dispatch(OffersActionCreator.setOffersRequestStatus(`error`));
        dispatch(OffersActionCreator.setOffersRequestMessage(`Ошибка загрузки предложений. Попробуйте позже`));

        throw error;
      });
  },

  getNearbyOffers: (hotelId) => (dispatch, getState, api) => {
    return api.get(`/hotels/${hotelId}/nearby`)
      .then((response) => {
        response = createAdapter(response.data);

        dispatch(OffersActionCreator.getNearbyOffers(response));
        dispatch(OffersActionCreator.setOffersRequestStatus(`success`));
        dispatch(OffersActionCreator.setOffersRequestMessage(null));
      })
      .catch(function (error) {
        dispatch(OffersActionCreator.setOffersRequestStatus(`error`));
        dispatch(OffersActionCreator.setOffersRequestMessage(`Ошибка загрузки предложений. Попробуйте позже`));

        throw error;
      });
  },
};

export {OffersAsyncActionCreator};
