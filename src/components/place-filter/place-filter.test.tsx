import * as React from "react";
import * as renderer from "react-test-renderer";
import PlaceFilter from "./place-filter";
import {TestFilter, TestFilters} from "../../types/test-types/filters-test-type";

// set mocha data
const isFilterOpened = true;
const currentFilter: TestFilter = {
  id: `1`,
  value: `filter`,
};
const filtersArr: TestFilters = [
  {
    id: `1`,
    value: `filter`,
  },
];

const setFilterStatus = () => ({});
const getCurrentFilter = () => ({});

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
