import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import withPlaceFilter from "./with-place-filter";

configure({adapter: new Adapter()});

// set mocha data
const MockComponent = () => <div />;
const PlaceFilterWrappedHoc = withPlaceFilter(MockComponent);
const isFilterOpened = false;

it(`initial value of "isFilterOpened" should be "false"`, () => {
  const tree = shallow(
    <PlaceFilterWrappedHoc
      setDefaultOrderOffers={() => null}
      setLowToHighOrderOffers={() => null}
      setHighToLowOrderOffers={() => null}
      setTopRatedFirstOrderOffers={() => null}
      isFilterOpened={isFilterOpened}
    />
  );

  expect(tree.props().isFilterOpened).toBe(false);
});
