const FavoritesActionType = {
  SET_FAVORITE_REQUEST_STATUS: `SET_FAVORITE_REQUEST_STATUS`,
  SET_FAVORITE_REQUEST_MESSAGE: `SET_FAVORITE_REQUEST_MESSAGE`,
  GET_FAVORITE_OFFER: `GET_FAVORITE_OFFER`,
};

const FavoritesActionCreator = {
  setFavoriteRequestStatus: (status) => ({
    type: FavoritesActionType.SET_FAVORITE_REQUEST_STATUS,
    payload: status,
  }),

  setFavoriteRequestMessage: (message) => ({
    type: FavoritesActionType.SET_FAVORITE_REQUEST_MESSAGE,
    payload: message,
  }),

  getFavoriteOffer: (offer) => ({
    type: FavoritesActionType.GET_FAVORITE_OFFER,
    payload: offer,
  }),
};

export {FavoritesActionType, FavoritesActionCreator};

