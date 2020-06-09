import * as React from "react";
import * as renderer from "react-test-renderer";
import withMap from "./with-map";
import {TestOffers} from "../../types/test-types/offers-test-type";

type TestLocation = {
  latitude: number;
  longitude: number;
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
const activelocation: TestLocation = {
  latitude: 1,
  longitude: 1,
};
const hoveredLocation: TestLocation = {
  latitude: 1,
  longitude: 1,
};

const MockComponent = () => {
  return (
    <div></div>
  );
};

const MapWrappedHoc = withMap(MockComponent);

it(`render withMap`, () => {
  const tree = renderer.create((
    <MapWrappedHoc
      props={props}
      offers={offers}
      activelocation={activelocation}
      hoveredLocation={hoveredLocation}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
