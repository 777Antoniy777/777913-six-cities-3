import * as React from "react";
import * as renderer from "react-test-renderer";
import Cities from "./cities";

// set mocha data
const cities: string[] = [
  `Omsk`,
  `Moscow`,
  `Saint-Petersburg`,
];
const currentCity = `city`;

it(`render Cities`, () => {
  const tree = renderer.create(
      <Cities
        cities={cities}
        currentCity={currentCity}
        getActiveItem={() => null}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
