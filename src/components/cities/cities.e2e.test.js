import React from 'react';
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Cities from './cities';

Enzyme.configure({
  adapter: new Adapter(),
});

// set mocha data
const citiesArr = [
  `Omsk`,
  `Moscow`,
  `Saint-Petersburg`,
];
const currentCity = `Omsk`;

it(`city should set into callback after click on link`, () => {
  const onGetCity = jest.fn((data) => data);

  let cities = mount(
      <Cities
        cities={citiesArr}
        currentCity={currentCity}
        onGetCity={onGetCity}
      />
  );

  const link = cities.find(`.locations__item-link`).first();
  link.simulate(`click`, {
    preventDefault() {},
    onGetCity() {}
  });

  expect(onGetCity).toHaveBeenCalledTimes(1);
  expect(onGetCity.mock.calls[0][0]).toEqual(currentCity);
});