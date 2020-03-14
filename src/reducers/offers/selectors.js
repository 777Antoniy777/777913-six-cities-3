import {createSelector} from "reselect";

const getRequestStatus = (state) => {
  return state.offers.requestStatus;
};

const getRequestMessage = (state) => {
  return state.offers.requestMessage;
};

const getInitialOffers = (state) => {
  return state.offers.initialOffers;
};

const getOffers = (state) => {
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

export {getInitialOffersSelector, getOffersSelector, getCitiesSelector, getRequestStatus, getRequestMessage, getInitialOffers, getOffers, getCity};
