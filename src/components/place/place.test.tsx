import * as React from "react";
import * as renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {Place} from "./place";
import {Offer, Offers} from "../../types/offers-type";
import {Reviews} from "../../types/reviews-type";
import {User} from "../../types/user-type";
import {RouteHistory} from "../../types/history-type";
import {RouteLocation} from "../../types/location-type";

const mockStore = configureStore();

// set mocha data
const offer: Offer = {
  id: 1,
  city: {
    name: `city`,
    location: {
      latitude: 20,
      longitude: 20,
      zoom: 20,
    },
  },
  title: `title 1`,
  premium: false,
  favorite: false,
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
    id: 1,
    avatar: `img/avatar-1.jpg`,
    name: `name`,
    status: false,
  },
  location: {
    latitude: 20,
    longitude: 20,
    zoom: 20,
  },
};
const hoveredOffer: Offer = {
  id: 1,
  city: {
    name: `city`,
    location: {
      latitude: 20,
      longitude: 20,
      zoom: 20,
    },
  },
  title: `title 1`,
  premium: false,
  favorite: false,
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
    id: 1,
    avatar: `img/avatar-1.jpg`,
    name: `name`,
    status: false,
  },
  location: {
    latitude: 20,
    longitude: 20,
    zoom: 20,
  },
};
const nearbyOffers: Offers = [
  {
    id: 1,
    city: {
      name: `city`,
      location: {
        latitude: 20,
        longitude: 20,
        zoom: 20,
      },
    },
    title: `title 1`,
    premium: false,
    favorite: false,
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
      id: 1,
      avatar: `img/avatar-1.jpg`,
      name: `name`,
      status: false,
    },
    location: {
      latitude: 20,
      longitude: 20,
      zoom: 20,
    },
  },
];
const reviews: Reviews = [
  {
    id: 1,
    user: {
      id: 1,
      status: false,
      name: `name`,
      avatar: `avatar`,
    },
    comment: `comment`,
    rating: 10,
    date: `date`,
  },
];
const reviewsRequestStatus = `status`;
const reviewsRequestMessage = `message`;
const offersRequestStatus = `status`;
const offersRequestMessage = `message`;
const favoritesRequestStatus = `status`;
const favoritesRequestMessage = `message`;
const authorizationStatus = `AUTH`;
const userData: User = {
  id: 1,
  email: `email`,
  name: `name`,
  avatar: `avatar`,
  status: true,
};
const location: RouteLocation = {
  hash: `hash`,
  key: `key`,
  pathname: `/pathname`,
  search: `search`,
  state: `state`,
};
const history: RouteHistory = {
  action: `action`,
  block: () => null,
  createHref: () => null,
  go: () => null,
  goBack: () => null,
  goForward: () => null,
  length: 90,
  listen: () => null,
  location,
  push: () => null,
  replace: () => null,
};

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
            sendReview={() => null}
            setFavoriteStatus={() => null}
          />
        </Provider>
      </BrowserRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
