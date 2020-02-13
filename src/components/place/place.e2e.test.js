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

it(`Data of place should set into callback after hover`, () => {
  const {id, title, src, price, type} = data;
  const setPlaceData = jest.fn(data => data);

  let place = shallow(
      <Place
        key= { id }
        id={ id }
        title={ title }
        src={ src }
        price={ price }
        type={ type }
        setPlaceData={ setPlaceData }
      />
  );

  const card = place.find(`.place-card`);
  card.simulate(`mouseover`, {
    preventDefault() {},
    setPlaceData() {}
  });

  expect(setPlaceData).toHaveBeenCalledTimes(1);
  expect(setPlaceData.mock.calls[0][0]).toMatchObject(data);
});
