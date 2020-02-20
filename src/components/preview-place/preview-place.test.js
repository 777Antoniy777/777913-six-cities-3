import React from 'react';
import renderer from "react-test-renderer";
import PreviewPlace from "./preview-place";

// set mocha data
const elem = {
  id: 1,
  title: `title 1`,
  premium: false,
  src: `img/image1`,
  photos: [`img/image1`],
  price: 999999,
  description: `test`,
  type: `type`,
  rating: 9999,
  bedroomAmount: 30,
  guestsAmount: 50,
  items: [`item`],
  host: {
    avatar: `img/avatar-1.jpg`,
    name: `name`,
    status: false,
  },
  coord: [1, 1],
};

const onSetPlaceData = () => {};
const onSetPlaceStatus = () => {};

describe(`render PreviewPlace`, () => {

  it(`Place should render option`, () => {
    const tree = renderer.create(
        <PreviewPlace
          elem={elem}
          onSetPlaceData={onSetPlaceData}
          onSetPlaceStatus={onSetPlaceStatus}
        />)
        .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Place should render empty`, () => {
    const tree = renderer.create(
        <PreviewPlace
          elem={{}}
          onSetPlaceData={onSetPlaceData}
          onSetPlaceStatus={onSetPlaceStatus}
        />)
        .toJSON();

    expect(tree).toMatchSnapshot();
  });

});

// it(`Place should render option`, () => {
//   const tree = renderer.create(
//       <PreviewPlace
//         key= { id }
//         title={ title }
//         src={ src }
//         price={ price }
//         type={ type }
//         onSetData={ onSetData }
//       />)
//       .toJSON();

//   expect(tree).toMatchSnapshot();
// });
