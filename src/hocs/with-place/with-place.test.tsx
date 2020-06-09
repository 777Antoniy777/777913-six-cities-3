import * as React from "react";
import * as renderer from "react-test-renderer";
import withPlace from "./with-place";
import {TestOffers} from "../../types/test-types/offers-test-type";

type TestMatch = {
  params: {
    hotelID: string;
  };
}

// set mocha data
const props = [];
const offers: TestOffers = [
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
const history = {};
const match: TestMatch = {
  params: {
    hotelID: `1`,
  },
};

const getReviews = () => ({});
const getNearbyOffers = () => ({});
const getActiveItem = () => ({});

const MockComponent = () => {
  return (
    <div></div>
  );
};

const PlaceWrappedHoc = withPlace(MockComponent);

it(`render withPlace`, () => {
  const tree = renderer.create((
    <PlaceWrappedHoc
      props={props}
      offers={offers}
      match={match}
      history={history}
      getReviews={getReviews}
      getNearbyOffers={getNearbyOffers}
      getActiveItem={getActiveItem}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
