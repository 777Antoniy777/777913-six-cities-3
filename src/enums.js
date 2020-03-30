const FilterType = {
  DEFAULT: `default`,
  LOW_TO_HIGH: `lowToHigh`,
  HIGH_TO_LOW: `highToLow`,
  TOP_RATED_FIRST: `topRatedFirst`,
};

const StartResponseProperty = {
  PREVIEW_IMAGE: `preview_image`,
  BEDROOMS: `bedrooms`,
  MAX_ADULTS: `max_adults`,
  IS_FAVORITE: `is_favorite`,
  IS_PREMIUM: `is_premium`,
  IMAGES: `images`,
  GOODS: `goods`,
  HOST: `host`,
  IS_PRO: `is_pro`,
  AVATAR_URL: `avatar_url`,
  USER: `user`,
};

const EndResponseProperty = {
  SRC: `src`,
  BEDROOM_AMOUNT: `bedroomAmount`,
  GUESTS_AMOUNT: `guestsAmount`,
  FAVORITE: `favorite`,
  PREMIUM: `premium`,
  PHOTOS: `photos`,
  ITEMS: `items`,
  STATUS: `status`,
  AVATAR: `avatar`,
};

const AuthorizationStatus = {
  NO_AUTH: `NO_AUTH`,
  AUTH: `AUTH`,
};

const AppRoute = {
  MAIN: `/`,
  SIGN_IN: `/login`,
  FAVORITES: `/favorites`,
  OFFER: {
    ROUTE: `/offer/:hotelID`,
    setLink: (offerId) => `/offer/${offerId}`,
  },
  NOT_FOUND: {
    ROUTE: ``,
    LINK: `/404`,
  },
};

export {FilterType, StartResponseProperty, EndResponseProperty, AuthorizationStatus, AppRoute};
