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
  id: 1,
  value: `filter`,
};
const filtersArr = [
  {
    id: 1,
    value: `filter`,
  },
];

describe(`PlaceFilter should call correct callbacks`, () => {
  it(`handler should call only 1 time after click on filter caption`, () => {
    const onSetFilterStatus = jest.fn();

    const placeFilter = shallow(
        <PlaceFilter
          isFilterOpened={isFilterOpened}
          currentFilter={currentFilter}
          filtersArr={filtersArr}
          onSetFilterStatus={onSetFilterStatus}
        />
    );

    const filterCaption = placeFilter.find(`.places__sorting-caption`);

    const mockEvent = ({
      onSetFilterStatus() {},
    });

    filterCaption.simulate(`click`, mockEvent);

    expect(onSetFilterStatus).toHaveBeenCalledTimes(1);
  });

  it(`handler should call only 1 time after click on filter span`, () => {
    const onSetFilterStatus = jest.fn();

    const placeFilter = shallow(
        <PlaceFilter
          isFilterOpened={isFilterOpened}
          currentFilter={currentFilter}
          filtersArr={filtersArr}
          onSetFilterStatus={onSetFilterStatus}
        />
    );

    const filterSpan = placeFilter.find(`.places__sorting-type`);

    const mockEvent = ({
      onSetFilterStatus() {},
    });

    filterSpan.simulate(`click`, mockEvent);

    expect(onSetFilterStatus).toHaveBeenCalledTimes(1);
  });

  it(`handler should call only 1 time and get "currentFilter" after click on filter item`, () => {
    const onGetCurrentFilter = jest.fn((obj) => obj);

    const placeFilter = mount(
        <PlaceFilter
          isFilterOpened={isFilterOpened}
          currentFilter={currentFilter}
          filtersArr={filtersArr}
          onGetCurrentFilter={onGetCurrentFilter}
        />
    );

    const filterItem = placeFilter.find(`.places__option`);

    const mockEvent = ({
      onGetCurrentFilter() {},
    });

    filterItem.simulate(`click`, mockEvent);

    expect(onGetCurrentFilter).toHaveBeenCalledTimes(1);
    expect(onGetCurrentFilter.mock.calls[0][0]).toMatchObject(currentFilter);
  });
});
