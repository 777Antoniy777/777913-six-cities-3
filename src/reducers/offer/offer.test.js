import offerState from './offer';
import {OfferActionType, OfferActionCreator} from '../../actions/offer/action-creator';

const offer = {
  id: 1,
  city: `Omsk`,
  title: `title`,
  premium: false,
  src: `img/image.jpg`,
  photos: [
    `img/image-1.jpg`,
  ],
  price: 10,
  description: `description`,
  type: `type`,
  rating: 1,
  bedroomAmount: 1,
  guestsAmount: 1,
  items: [
    `item1`,
    `item2`,
  ],
  host: {
    avatar: `img/avatar.jpg`,
    name: `name`,
    status: false,
  },
  reviews: [
    {
      id: 1,
      body: `body`,
      rating: 1,
      name: `name`,
      date: `date`,
    },
  ],
  coords: [2, 3],
};

it(`Offer without additional parameters should return initial state`, () => {
  expect(offerState(void 0, {})).toEqual({
    offer: null,
    hoveredOffer: null,
  });
});

it(`Reducer should get current offer`, () => {
  expect(offerState({
    offer: null,
  }, {
    type: OfferActionType.GET_CURRENT_OFFER,
    payload: offer,
  })).toEqual({
    offer,
  });
});

it(`Reducer should get hovered offer`, () => {
  expect(offerState({
    hoveredOffer: null,
  }, {
    type: OfferActionType.GET_HOVERED_OFFER,
    payload: offer,
  })).toEqual({
    hoveredOffer: offer,
  });
});

it(`Reducer should remove hovered offer`, () => {
  expect(offerState({
    hoveredOffer: offer,
  }, {
    type: OfferActionType.REMOVE_HOVERED_OFFER,
    payload: null,
  })).toEqual({
    hoveredOffer: null,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for get current offer should returns "Offer"`, () => {
    expect(OfferActionCreator.getCurrentOffer(offer))
      .toEqual({
        type: OfferActionType.GET_CURRENT_OFFER,
        payload: offer,
      });
  });

  it(`Action creator for get hovered offer should returns "Offer"`, () => {
    expect(OfferActionCreator.getHoveredOffer(offer))
      .toEqual({
        type: OfferActionType.GET_HOVERED_OFFER,
        payload: offer,
      });
  });

  it(`Action creator for remove hovered offer should returns "null"`, () => {
    expect(OfferActionCreator.removeHoveredOffer(null))
      .toEqual({
        type: OfferActionType.REMOVE_HOVERED_OFFER,
        payload: null,
      });
  });
});
