import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Place from "./place";

Enzyme.configure({
  adapter: new Adapter(),
});

// set mocha data
const data = {
  id: 1,
  title: `title 1`,
  src: `img/image1`,
  price: 999999,
  type: `type`,
};

const {id, title, src, price, type} = data;

const mockEvent = {
  preventDefault() {}
};

it(`Should card be hovered`, () => {
  const onSetData = jest.fn();

  let place = shallow(
      <Place
        key= { id }
        title={ title }
        src={ src }
        price={ price }
        type={ type }
        onSetData={ onSetData }
      />
  );

  const card = place.find(`.place-card`);
  const handleCardMouseover = jest.fn();

  card.simulate(`mouseover`, {preventDefault: mockEvent, onSetData});

  expect(onSetData).toHaveBeenCalledTimes(1);
  expect(handleCardMouseover).toHaveBeenCalledTimes(1);
});
