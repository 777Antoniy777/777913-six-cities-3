import {createSelector} from "reselect";

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

export {getFavoriteOffers, getFavoriteCitiesSelector};
