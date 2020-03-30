import React from "react";
import renderer from "react-test-renderer";
import PlaceFilter from "./place-filter";

// set mocha data
const isFilterOpened = true;
const currentFilter = {
  id: `1`,
  value: `filter`,
};
const filtersArr = [
  {
    id: `1`,
    value: `filter`,
  },
];

const setFilterStatus = () => {};
const getCurrentFilter = () => {};

it(`render PlaceFilter`, () => {
  const tree = renderer.create(
      <PlaceFilter
        isFilterOpened={isFilterOpened}
        currentFilter={currentFilter}
        filtersArr={filtersArr}
        setFilterStatus={setFilterStatus}
        getCurrentFilter={getCurrentFilter}
      />)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
