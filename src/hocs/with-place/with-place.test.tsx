import * as React from "react";
import * as renderer from "react-test-renderer";
import withPlace from "./with-place";
import {Offers} from "../../types/offers-type";
import {RouteHistory} from "../../types/history-type";
import {RouteLocation} from "../../types/location-type";

interface MockComponentProps {
  children: React.ReactNode;
}

type RouteMatch = {
  params: {
    hotelID: string;
  };
}

// set mocha data
const hockProps = {};
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
const match: RouteMatch = {
  params: {
    hotelID: `1`,
  },
};

const MockComponent = (props: MockComponentProps) => {
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

const PlaceWrappedHoc = withPlace(MockComponent);

it(`render withPlace`, () => {
  const tree = renderer.create(
      <PlaceWrappedHoc
        props={hockProps}
        offers={offers}
        match={match}
        history={history}
        getReviews={() => null}
        getNearbyOffers={() => null}
        getActiveItem={() => null}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
