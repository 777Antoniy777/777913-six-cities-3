import offerState from './offer';
import ActionType from '../../action-type';
import ActionCreator from '../../actions/action-creator';

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
    isShowOffer: false,
  });
});

it(`Reducer should get current offer`, () => {
  expect(offerState({
    offer: null,
  }, {
    type: ActionType.GET_CURRENT_OFFER,
    payload: offer,
  })).toEqual({
    offer,
  });
});

it(`Reducer should get hovered offer`, () => {
  expect(offerState({
    hoveredOffer: null,
  }, {
    type: ActionType.GET_HOVERED_OFFER,
    payload: offer,
  })).toEqual({
    hoveredOffer: offer,
  });
});

it(`Reducer should remove hovered offer`, () => {
  expect(offerState({
    hoveredOffer: offer,
  }, {
    type: ActionType.REMOVE_HOVERED_OFFER,
    payload: null,
  })).toEqual({
    hoveredOffer: null,
  });
});

it(`Reducer should set offer status`, () => {
  expect(offerState({
    isShowOffer: false,
  }, {
    type: ActionType.SET_OFFER_STATUS,
    payload: false,
  })).toEqual({
    isShowOffer: false,
  });

  expect(offerState({
    isShowOffer: true,
  }, {
    type: ActionType.SET_OFFER_STATUS,
    payload: true,
  })).toEqual({
    isShowOffer: true,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for get current offer returns correct action`, () => {
    expect(ActionCreator.getCurrentOfferAction())
      .toEqual({
        type: ActionType.GET_CURRENT_OFFER,
        payload: undefined,
      });
  });

  it(`Action creator for get current offer should returns "Offer"`, () => {
    expect(ActionCreator.getCurrentOfferAction(offer))
    .toEqual({
      type: ActionType.GET_CURRENT_OFFER,
      payload: offer,
    });
  });

  it(`Action creator for get hovered offer returns correct action`, () => {
    expect(ActionCreator.getHoveredOfferAction())
      .toEqual({
        type: ActionType.GET_HOVERED_OFFER,
        payload: undefined,
      });
  });

  it(`Action creator for get hovered offer should returns "Offer"`, () => {
    expect(ActionCreator.getHoveredOfferAction(offer))
    .toEqual({
      type: ActionType.GET_HOVERED_OFFER,
      payload: offer,
    });
  });

  it(`Action creator for remove hovered offer returns correct action`, () => {
    expect(ActionCreator.removeHoveredOfferAction())
      .toEqual({
        type: ActionType.REMOVE_HOVERED_OFFER,
        payload: undefined,
      });
  });

  it(`Action creator for remove hovered offer should returns "null"`, () => {
    expect(ActionCreator.removeHoveredOfferAction(null))
    .toEqual({
      type: ActionType.REMOVE_HOVERED_OFFER,
      payload: null,
    });
  });

  it(`Action creator for set offer status returns correct action`, () => {
    expect(ActionCreator.setOfferStatusAction()).toEqual({
      type: ActionType.SET_OFFER_STATUS,
      payload: undefined,
    });
  });

  it(`Action creator for set offer status should returns "false"`, () => {
    expect(ActionCreator.setOfferStatusAction(false))
    .toEqual({
      type: ActionType.SET_OFFER_STATUS,
      payload: false,
    });
  });

  it(`Action creator for set offer status should returns "true"`, () => {
    expect(ActionCreator.setOfferStatusAction(true))
    .toEqual({
      type: ActionType.SET_OFFER_STATUS,
      payload: true,
    });
  });
});
