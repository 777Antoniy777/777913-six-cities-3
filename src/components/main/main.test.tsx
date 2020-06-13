import * as React from "react";
import * as renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Main from "./main";
import {Offer, Offers} from "../../types/offers-type";
import {User} from "../../types/user-type";
import {RouteHistory} from "../../types/history-type";
import {RouteLocation} from "../../types/location-type";

const mockStore = configureStore();

// set mocha data
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
const offers: Offers = [
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
const initialOffers: Offers = [
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
const filteredOffers: Offers = [
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
const cities: string[] = [
  `Moscow`,
  `Omsk`,
];
const currentCity = `city`;
const offersRequestStatus = `status`;
const offersRequestMessage = `message`;
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
    requestStatus: null,
    requestMessage: null,
    city: `city`,
    initialOffers,
    offers,
  },
  offer: {
    hoveredOffer,
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

it(`render Main`, () => {
  const tree = renderer.create(
      <BrowserRouter>
        <Provider store={store}>
          <Main
            hoveredOffer={hoveredOffer}
            offersRequestStatus={offersRequestStatus}
            offersRequestMessage={offersRequestMessage}
            offers={offers}
            initialOffers={initialOffers}
            filteredOffers={filteredOffers}
            currentCity={currentCity}
            cities={cities}
            authorizationStatus={authorizationStatus}
            userData={userData}
            history={history}
            location={location}
            getCurrentCity={() => null}
            setDefaultOrderOffers={() => null}
            setLowToHighOrderOffers={() => null}
            setHighToLowOrderOffers={() => null}
            setTopRatedFirstOrderOffers={() => null}
          />
        </Provider>
      </BrowserRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

