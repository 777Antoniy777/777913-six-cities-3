import React from 'react';
import renderer from "react-test-renderer";
import Cities from './cities';

// set mocha data
const cities = [
  `Omsk`,
  `Moscow`,
  `Saint-Petersburg`,
];
const currentCity = `city`;

const onGetCity = () => {};

it(`render Cities`, () => {
  const tree = renderer.create(
      <Cities
        cities={cities}
        currentCity={currentCity}
        onGetCity={onGetCity}
      />)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
