import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main";

Enzyme.configure({
  adapter: new Adapter(),
});

// set mocha data
const rentAmount = 666;
const apartments = [
  {
    id: 1,
    title: `title 1`,
    src: `img/image1`,
    price: 999999,
    type: `type`,
  },
];

it(`Should title be pressed`, () => {
  let main = shallow(
      <Main
        rentAmount={ rentAmount }
        apartments={ apartments }
      />
  );

  const title = main.find(`.place-card__name`);
  title.simulate(`click`);
});
