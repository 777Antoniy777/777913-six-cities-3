import React from "react";
import renderer from "react-test-renderer";
import withPlaceFilter from "./with-place-filter";

// set mocha data
const props = [];
const offers = [
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
const initialOffers = [
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

const setDefaultOrderOffers = () => {};
const setLowToHighOrderOffers = () => {};
const setHighToLowOrderOffers = () => {};
const setTopRatedFirstOrderOffers = () => {};

const MockComponent = () => {
  return (
    <div></div>
  );
};

const PlaceFilterWrappedHoc = withPlaceFilter(MockComponent);

it(`render withPlaceFilter`, () => {
  const tree = renderer.create((
    <PlaceFilterWrappedHoc
      props={props}
      offers={offers}
      initialOffers={initialOffers}
      setDefaultOrderOffers={setDefaultOrderOffers}
      setLowToHighOrderOffers={setLowToHighOrderOffers}
      setHighToLowOrderOffers={setHighToLowOrderOffers}
      setTopRatedFirstOrderOffers={setTopRatedFirstOrderOffers}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
