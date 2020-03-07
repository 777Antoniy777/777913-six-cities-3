import React from 'react';
import renderer from "react-test-renderer";
import PlaceFilter from './place-filter';

// set mocha data
const isFilterOpened = true;
const currentFilter = {
  id: 1,
  value: `filter`,
};
const filtersArr = [
  {
    id: 1,
    value: `filter`,
  },
];

const onSetFilterStatus = () => {};
const onGetCurrentFilter = () => {};

it(`render PlaceFilter`, () => {
  const tree = renderer.create(
      <PlaceFilter
        isFilterOpened={isFilterOpened}
        currentFilter={currentFilter}
        filtersArr={filtersArr}
        onSetFilterStatus={onSetFilterStatus}
        onGetCurrentFilter={onGetCurrentFilter}
      />)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
