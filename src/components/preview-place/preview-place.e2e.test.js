import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PreviewPlace from "./preview-place";

Enzyme.configure({
  adapter: new Adapter(),
});

// set mocha data
const isShowOffer = true;
const placeData = {
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

it(`placeData and status should set into callback after click on title`, () => {
  const onSetPlaceData = jest.fn((data) => data);
  const onSetPlaceStatus = jest.fn();
  const scrollTo = jest.fn();
  Object.defineProperty(global.window, `scrollTo`, {
    value: scrollTo
  });

  let place = shallow(
      <PreviewPlace
        placeData={placeData}
        isShowOffer={isShowOffer}
        onSetPlaceData={onSetPlaceData}
        onSetPlaceStatus={onSetPlaceStatus}
      />
  );

  const card = place.find(`.place-card__name`);
  card.simulate(`click`, {
    preventDefault() {},
    onSetPlaceData() {},
    onSetPlaceStatus() {}
  });

  expect(scrollTo).toHaveBeenCalledWith(0, 0);
  expect(onSetPlaceData).toHaveBeenCalledTimes(1);
  expect(onSetPlaceData.mock.calls[0][0]).toMatchObject(placeData);
  expect(onSetPlaceStatus).toHaveBeenCalledTimes(1);
});
