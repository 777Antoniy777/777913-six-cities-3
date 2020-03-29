import {StartResponseProperty, EndResponseProperty} from "../../enums";
import {FavoritesActionCreator} from "./action-creator";
import {OffersActionCreator} from "../offers/action-creator";
import {OfferActionCreator} from "../offer/action-creator";

const createAdapterOnGet = (json) => {
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

const createAdapterOnPost = (json) => {
  const obj = json;
  const newObj = {};
  let val = ``;

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

  return newObj;
};

const FavoritesAsyncActionCreator = {
  getFavoriteOffers: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        response = createAdapterOnGet(response.data);

        dispatch(FavoritesActionCreator.getFavoriteOffers(response));
        dispatch(FavoritesActionCreator.setFavoriteRequestStatus(`success`));
        dispatch(FavoritesActionCreator.setFavoriteRequestMessage(null));
      })
      .catch(function (error) {
        dispatch(FavoritesActionCreator.setFavoriteRequestStatus(`error`));
        dispatch(FavoritesActionCreator.setFavoriteRequestMessage(`Ошибка загрузки избранных предложений. Попробуйте позже`));

        throw error;
      });
  },

  setFavoriteStatus: (hotelId, status) => (dispatch, getState, api) => {
    return api.post(`/favorite/${hotelId}/${status}`)
      .then((response) => {
        response = createAdapterOnPost(response.data);

        dispatch(OffersActionCreator.getFavoriteOffer(response));
        dispatch(OfferActionCreator.getFavoriteOffer(response));
        dispatch(FavoritesActionCreator.getFavoriteOffer(response));
        dispatch(FavoritesActionCreator.setFavoriteRequestStatus(`success`));
        dispatch(FavoritesActionCreator.setFavoriteRequestMessage(null));
      })
      .catch(function (error) {
        dispatch(FavoritesActionCreator.setFavoriteRequestStatus(`error`));
        dispatch(FavoritesActionCreator.setFavoriteRequestMessage(`Ошибка загрузки избранного предложения. Попробуйте позже`));

        throw error;
      });
  },
};

export {FavoritesAsyncActionCreator};
