import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PreviewPlace from "./preview-place";

Enzyme.configure({
  adapter: new Adapter(),
});

// set mocha data
const elem = {
  id: 1,
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
  coord: [1, 1],
};

const placeData = elem;

it(`placeData should set into callback after hover`, () => {
  const onSetPlaceData = jest.fn((data) => data);

  let place = shallow(
      <PreviewPlace
        elem={elem}
        onSetPlaceData={onSetPlaceData}
      />
  );

  const card = place.find(`.place-card`);
  card.simulate(`mouseover`, {
    preventDefault() {},
    onSetPlaceData() {}
  });

  expect(onSetPlaceData).toHaveBeenCalledTimes(1);
  expect(onSetPlaceData.mock.calls[0][0]).toMatchObject(placeData);
});

it(`place status should change after callback after click on title`, () => {
  const onSetPlaceStatus = jest.fn();

  let place = shallow(
      <PreviewPlace
        elem={elem}
        onSetPlaceStatus={onSetPlaceStatus}
      />
  );

  const card = place.find(`.place-card__name`);
  card.simulate(`click`, {
    preventDefault() {},
    onSetPlaceStatus() {}
  });

  expect(onSetPlaceStatus).toHaveBeenCalledTimes(1);
});

