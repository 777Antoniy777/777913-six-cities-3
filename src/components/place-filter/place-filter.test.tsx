import * as React from "react";
import * as renderer from "react-test-renderer";
import PlaceFilter from "./place-filter";
import {Filter, Filters} from "../../types/filters-type";

// set mocha data
const isFilterOpened = true;
const currentFilter: Filter = {
  id: `1`,
  value: `filter`,
};
const filtersArr: Filters = [
  {
    id: `1`,
    value: `filter`,
  },
];

it(`render PlaceFilter`, () => {
  const tree = renderer.create(
      <PlaceFilter
        isFilterOpened={isFilterOpened}
        currentFilter={currentFilter}
        filtersArr={filtersArr}
        setFilterStatus={() => null}
        getCurrentFilter={() => null}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
