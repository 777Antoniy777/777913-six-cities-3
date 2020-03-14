import React from "react";
import Enzyme, {shallow, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PlaceFilter from "./place-filter";

Enzyme.configure({
  adapter: new Adapter(),
});

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

describe(`PlaceFilter should call correct callbacks`, () => {
  it(`handler should call only 1 time after click on filter caption`, () => {
    const setFilterStatus = jest.fn();

    const placeFilter = shallow(
        <PlaceFilter
          isFilterOpened={isFilterOpened}
          currentFilter={currentFilter}
          filtersArr={filtersArr}
          setFilterStatus={setFilterStatus}
        />
    );

    const filterCaption = placeFilter.find(`.places__sorting-caption`);

    const mockEvent = ({
      setFilterStatus() {},
    });

    filterCaption.simulate(`click`, mockEvent);

    expect(setFilterStatus).toHaveBeenCalledTimes(1);
  });

  it(`handler should call only 1 time after click on filter span`, () => {
    const setFilterStatus = jest.fn();

    const placeFilter = shallow(
        <PlaceFilter
          isFilterOpened={isFilterOpened}
          currentFilter={currentFilter}
          filtersArr={filtersArr}
          setFilterStatus={setFilterStatus}
        />
    );

    const filterSpan = placeFilter.find(`.places__sorting-type`);

    const mockEvent = ({
      setFilterStatus() {},
    });

    filterSpan.simulate(`click`, mockEvent);

    expect(setFilterStatus).toHaveBeenCalledTimes(1);
  });

  it(`handler should call only 1 time and get "currentFilter" after click on filter item`, () => {
    const getCurrentFilter = jest.fn((obj) => obj);

    const placeFilter = mount(
        <PlaceFilter
          isFilterOpened={isFilterOpened}
          currentFilter={currentFilter}
          filtersArr={filtersArr}
          getCurrentFilter={getCurrentFilter}
        />
    );

    const filterItem = placeFilter.find(`.places__option`);

    const mockEvent = ({
      getCurrentFilter() {},
    });

    filterItem.simulate(`click`, mockEvent);

    expect(getCurrentFilter).toHaveBeenCalledTimes(1);
    expect(getCurrentFilter.mock.calls[0][0]).toMatchObject(currentFilter);
  });
});
