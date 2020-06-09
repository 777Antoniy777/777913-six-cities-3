import * as React from "react";
import * as renderer from "react-test-renderer";
import PlaceHost from "./place-host";

// set mocha data
const status = false;
const avatar = `img/avatar-1.jpg`;
const name = `name`;
const description = `test`;

it(`render PlaceHost`, () => {
  const tree = renderer.create(
      <PlaceHost
        status={status}
        avatar={avatar}
        name={name}
        description={description}
      />)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
