import React from 'react';
import renderer from "react-test-renderer";
import withPlaceFilter from "./with-place-filter";

// set mocha data
const props = [];
const offers = [
  {
    id: 1,
    city: `city`,
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
    city: `city`,
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

const onSetDefaultOrderOffers = () => {};
const onSetLowToHighOrderOffers = () => {};
const onSetHighToLowOrderOffers = () => {};
const onSetTopRatedFirstOrderOffers = () => {};

const MockComponent = () => {
  return (
    <div></div>
  );
};

const PlaceFilterWrapperHoc = withPlaceFilter(MockComponent);

it(`render withPlaceFilter`, () => {
  const tree = renderer.create((
    <PlaceFilterWrapperHoc
      props={props}
      offers={offers}
      initialOffers={initialOffers}
      onSetDefaultOrderOffers={onSetDefaultOrderOffers}
      onSetLowToHighOrderOffers={onSetLowToHighOrderOffers}
      onSetHighToLowOrderOffers={onSetHighToLowOrderOffers}
      onSetTopRatedFirstOrderOffers={onSetTopRatedFirstOrderOffers}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
