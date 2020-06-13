import * as React from "react";
import {configure, shallow, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import PlaceFilter from "./place-filter";
import {Filter, Filters} from "../../types/filters-type";

configure({adapter: new Adapter()});

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

describe(`PlaceFilter should call correct functions`, () => {
  it(`function should be called only 1 time after click on filter caption`, () => {
    const setFilterStatus = jest.fn();

    const placeFilter = shallow(
        <PlaceFilter
          isFilterOpened={isFilterOpened}
          currentFilter={currentFilter}
          filtersArr={filtersArr}
          setFilterStatus={setFilterStatus}
          getCurrentFilter={() => null}
        />
    );

    const filterCaption = placeFilter.find(`.places__sorting-caption`);

    const mockEvent = ({
      preventDefault: () => null,
    });

    filterCaption.simulate(`click`, mockEvent);

    expect(setFilterStatus).toHaveBeenCalledTimes(1);
  });

  it(`function should be called only 1 time after click on filter span`, () => {
    const setFilterStatus = jest.fn();

    const placeFilter = shallow(
        <PlaceFilter
          isFilterOpened={isFilterOpened}
          currentFilter={currentFilter}
          filtersArr={filtersArr}
          setFilterStatus={setFilterStatus}
          getCurrentFilter={() => null}
        />
    );

    const filterSpan = placeFilter.find(`.places__sorting-type`);

    const mockEvent = ({
      preventDefault: () => null,
    });

    filterSpan.simulate(`click`, mockEvent);

    expect(setFilterStatus).toHaveBeenCalledTimes(1);
  });

  it(`function should be called only 1 time and set "currentFilter" in arguments after click on filter item`, () => {
    const getCurrentFilter = jest.fn();

    const placeFilter = mount(
        <PlaceFilter
          isFilterOpened={isFilterOpened}
          currentFilter={currentFilter}
          filtersArr={filtersArr}
          setFilterStatus={() => null}
          getCurrentFilter={getCurrentFilter}
        />
    );

    const filterItem = placeFilter.find(`.places__option`);

    const mockEvent = ({
      preventDefault: () => null,
    });

    filterItem.simulate(`click`, mockEvent);

    expect(getCurrentFilter).toHaveBeenCalledTimes(1);
    expect(getCurrentFilter.mock.calls[0][0]).toMatchObject(currentFilter);
  });
});
