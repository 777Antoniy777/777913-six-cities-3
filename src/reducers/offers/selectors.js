import {createSelector} from "reselect";

const getOffersRequestStatus = (state) => {
  return state.offers.requestStatus;
};

const getOffersRequestMessage = (state) => {
  return state.offers.requestMessage;
};

const getInitialOffers = (state) => {
  if (state.favorites.favoriteOffer) {
    const {id} = state.favorites.favoriteOffer;
    return [...state.offers.initialOffers.slice(0, id - 1), state.favorites.favoriteOffer, ...state.offers.initialOffers.slice(id)];
  }

  return state.offers.initialOffers;
};

const getOffers = (state) => {
  if (state.favorites.favoriteOffer) {
    const {id} = state.favorites.favoriteOffer;
    return [...state.offers.offers.slice(0, id - 1), state.favorites.favoriteOffer, ...state.offers.offers.slice(id)];
  }

  return state.offers.offers;
};

const getCity = (state) => {
  return state.offers.city;
};

const getInitialOffersSelector = createSelector(
    getInitialOffers,
    getCity,
    (offers, city) => {
      return offers.filter((elem) => {
        return elem.city.name.includes(city);
      });
    }
);

const getOffersSelector = createSelector(
    getOffers,
    getCity,
    (offers, city) => {
      return offers.filter((elem) => {
        return elem.city.name.includes(city);
      });
    }
);

const getCitiesSelector = createSelector(
    getInitialOffers,
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

export {getInitialOffersSelector, getOffersSelector, getCitiesSelector, getOffersRequestStatus, getOffersRequestMessage, getInitialOffers, getOffers, getCity};
