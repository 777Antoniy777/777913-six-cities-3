import {createSelector} from "reselect";

const getFavoritesRequestStatus = (state) => {
  return state.favorites.requestStatus;
};

const getFavoritesRequestMessage = (state) => {
  return state.favorites.requestMessage;
};

const getFavoriteOffers = (state) => {
  return state.favorites.favoriteOffers;
};

const getFavoriteCitiesSelector = createSelector(
    getFavoriteOffers,
    (offers) => {
      let set = new Set();

      offers.forEach((elem) => {
        const city = elem.city.name;
        set.add(city);
      });

      const cities = Array.from(set);
      const splittedCities = cities.slice(0, 6);

      return splittedCities;
    }
);

export {getFavoriteCitiesSelector, getFavoriteOffers, getFavoritesRequestStatus, getFavoritesRequestMessage};
