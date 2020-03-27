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

const createAdapterOnPost = (json) => {
  const obj = json;
  const newObj = {};
  let val = ``;

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
