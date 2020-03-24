const FavoritesActionType = {
  SET_FAVORITE_REQUEST_STATUS: `SET_FAVORITE_REQUEST_STATUS`,
  SET_FAVORITE_REQUEST_MESSAGE: `SET_FAVORITE_REQUEST_MESSAGE`,
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
};

export {FavoritesActionType, FavoritesActionCreator};

