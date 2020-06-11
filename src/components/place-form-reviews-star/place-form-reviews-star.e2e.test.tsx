import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import PlaceFormReviewsStar from "./place-form-reviews-star";

configure({adapter: new Adapter()});

type TestStar = {
  id: number;
  title: string;
}

// set mocha data
const star: TestStar = {
  id: 1,
  title: `title`,
};
const rating = true;

it(`function should be called only 1 time after change any radio button`, () => {
  const handleInputChange = jest.fn();

  const placeFormReviewsStar = shallow(
      <PlaceFormReviewsStar
        star={star}
        rating={rating}
        handleInputChange={handleInputChange}
      />
  );

  const radioButton = placeFormReviewsStar.find(`.form__rating-input`);

  const mockEvent = {
    // handleInputChange() {},
    preventDefault: () => null,
  };

  radioButton.simulate(`change`, mockEvent);

  expect(handleInputChange).toHaveBeenCalledTimes(1);
});
