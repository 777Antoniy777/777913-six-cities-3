import * as React from "react";
import * as renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {Place} from "./place";
import {TestOffer, TestOffers} from "../../types/test-types/offers-test-type";
import {TestReviews} from "../../types/test-types/reviews-test-type";
import {TestUser} from "../../types/test-types/user-test-type";
import {TestRouteLocation} from "../../types/test-types/location-test-type";

const mockStore = configureStore();

// set mocha data
const offer: TestOffer = {
  id: 1,
  city: {
    id: 1,
    name: `city`,
    coords: [1, 1],
  },
  title: `title 1`,
  premium: false,
  src: `img/image1`,
  photos: [`img/image1`],
  price: 999999,
  description: `test`,
  type: `type`,
  rating: 9999,
  bedroomAmount: 30,
  guestsAmount: 50,
  items: [`item`],
  host: {
    avatar: `img/avatar-1.jpg`,
    name: `name`,
    status: false,
  },
  reviews: [
    {
      id: 1,
      body: `text`,
      rating: 5,
      name: `name`,
      date: `date`,
    },
  ],
  coord: [1, 1],
};
const hoveredOffer: TestOffer = {
  id: 1,
  city: {
    id: 1,
    name: `city`,
    coords: [1, 1],
  },
  title: `title 1`,
  premium: false,
  src: `img/image1`,
  photos: [`img/image1`],
  price: 999999,
  description: `test`,
  type: `type`,
  rating: 9999,
  bedroomAmount: 30,
  guestsAmount: 50,
  items: [`item`],
  host: {
    avatar: `img/avatar-1.jpg`,
    name: `name`,
    status: false,
  },
  reviews: [
    {
      id: 1,
      body: `text`,
      rating: 5,
      name: `name`,
      date: `date`,
    },
  ],
  coord: [1, 1],
};
const nearbyOffers: TestOffers = [
  {
    id: 1,
    city: {
      id: 1,
      name: `city`,
      coords: [1, 1],
    },
    title: `title 1`,
    premium: false,
    src: `img/image1`,
    photos: [`img/image1`],
    price: 999999,
    description: `test`,
    type: `type`,
    rating: 9999,
    bedroomAmount: 30,
    guestsAmount: 50,
    items: [`item`],
    host: {
      avatar: `img/avatar-1.jpg`,
      name: `name`,
      status: false,
    },
    reviews: [
      {
        id: 1,
        body: `text`,
        rating: 5,
        name: `name`,
        date: `date`,
      },
    ],
    coord: [1, 1],
  },
];
const reviews: TestReviews = [
  {
    id: 1,
    user: {
      id: 1,
      name: `name`,
      comment: `comment`,
    },
    status: `status`,
  },
];
const reviewsRequestStatus = `status`;
const reviewsRequestMessage = `message`;
const offersRequestStatus = `status`;
const offersRequestMessage = `message`;
const favoritesRequestStatus = `status`;
const favoritesRequestMessage = `message`;
const authorizationStatus = `AUTH`;
const userData: TestUser = {
  id: 1,
  name: `name`,
  avatar: `avatar`,
  status: true,
};
const history = {};
const location: TestRouteLocation = {
  pathname: `/pathname`,
};

const sendReview = () => ({});
const setFavoriteStatus = () => ({});

const store = mockStore({
  offers: {
    nearbyOffers,
  },
  offer: {
    offer,
    hoveredOffer,
  },
  reviews: {
    requestStatus: null,
    requestMessage: null,
    reviews,
  },
  favorites: {
    requestStatus: null,
    requestMessage: null,
  },
  user: {
    authorizationStatus: `NO_AUTH`,
    userData: null,
  }
});

it(`render Place`, () => {
  beforeEach(() => { // Runs before each test in the suite
    store.clearActions();
  });

  const tree = renderer.create(
      <BrowserRouter>
        <Provider store={store}>
          <Place
            offer={offer}
            hoveredOffer={hoveredOffer}
            reviewsRequestStatus={reviewsRequestStatus}
            reviewsRequestMessage={reviewsRequestMessage}
            offersRequestStatus={offersRequestStatus}
            offersRequestMessage={offersRequestMessage}
            favoritesRequestStatus={favoritesRequestStatus}
            favoritesRequestMessage={favoritesRequestMessage}
            reviews={reviews}
            authorizationStatus={authorizationStatus}
            userData={userData}
            history={history}
            location={location}
            nearbyOffers={nearbyOffers}
            sendReview={sendReview}
            setFavoriteStatus={setFavoriteStatus}
          />
        </Provider>
      </BrowserRouter>)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
