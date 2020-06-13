import * as React from "react";
import * as renderer from "react-test-renderer";
import withPlaceFilter from "./with-place-filter";

interface MockComponentProps {
  children: React.ReactNode;
}

// set mocha data
const hockProps = {};

const MockComponent = (props: MockComponentProps) => {
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

const PlaceFilterWrappedHoc = withPlaceFilter(MockComponent);

it(`render withPlaceFilter`, () => {
  const tree = renderer.create(
      <PlaceFilterWrappedHoc
        props={hockProps}
        setDefaultOrderOffers={() => null}
        setLowToHighOrderOffers={() => null}
        setHighToLowOrderOffers={() => null}
        setTopRatedFirstOrderOffers={() => null}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
