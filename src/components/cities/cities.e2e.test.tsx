import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import Cities from "./cities";

configure({adapter: new Adapter()});

// set mocha data
const citiesArr: string[] = [
  `Omsk`,
  `Moscow`,
  `Saint-Petersburg`,
];
const currentCity = `Omsk`;

it(`the function should set to argument "currentCity" after clicking on the link`, () => {
  const getActiveItem = jest.fn();

  const cities = mount(
      <Cities
        cities={citiesArr}
        currentCity={currentCity}
        getActiveItem={getActiveItem}
      />
  );

  const link = cities.find(`.locations__item-link`).first();

  const mockEvent = {
    preventDefault: () => null,
  };

  link.simulate(`click`, mockEvent);

  expect(getActiveItem).toHaveBeenCalledTimes(1);
  expect(getActiveItem.mock.calls[0][0]).toBe(currentCity);
});
