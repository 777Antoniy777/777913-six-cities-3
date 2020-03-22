const FilterType = {
  DEFAULT: `default`,
  LOW_TO_HIGH: `lowToHigh`,
  HIGH_TO_LOW: `highToLow`,
  TOP_RATED_FIRST: `topRatedFirst`,
};

const AuthorizationStatus = {
  NO_AUTH: `NO_AUTH`,
  AUTH: `AUTH`,
};

const AppRoute = {
  MAIN: `/`,
  SIGN_IN: `/login`,
  FAVORITES: `/favorites`,
  OFFER: (offerId) => `/offer/${offerId}`,
};

export {FilterType, AuthorizationStatus, AppRoute};
