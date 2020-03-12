import offersState from './offers';
import {OffersActionType} from "../../actions/offers/action-creator";
import {OffersActionCreator} from "../../actions/offers/action-creator";
import offers from '../../mocks/offers';

it(`Offers without additional parameters should return initial state`, () => {
  expect(offersState(void 0, {})).toEqual({
    city: offers[0].city,
    initialOffers: offers,
    offers: offers.slice(),
  });
});

it(`Reducer should set current city`, () => {
  expect(offersState({
    city: ``,
  }, {
    type: OffersActionType.GET_CURRENT_CITY,
    payload: `Moscow`,
  })).toEqual({
    city: `Moscow`,
  });
});

it(`Reducer should set default order of offers`, () => {
  expect(offersState({
    offers,
  }, {
    type: OffersActionType.SET_DEFAULT_ORDER_OFFERS,
    payload: offers,
  })).toEqual({
    offers,
  });
});

it(`Reducer should set low to hugh order of offers`, () => {
  const filteredOffers = offers.sort((left, right) => left.price - right.price);

  expect(offersState({
    offers,
  }, {
    type: OffersActionType.SET_LOW_TO_HIGH_ORDER_OFFERS,
    payload: filteredOffers,
  })).toEqual({
    offers: filteredOffers,
  });
});

it(`Reducer should set hugh to low order of offers`, () => {
  const filteredOffers = offers.sort((left, right) => right.price - left.price);

  expect(offersState({
    offers,
  }, {
    type: OffersActionType.SET_HIGH_TO_LOW_ORDER_OFFERS,
    payload: filteredOffers,
  })).toEqual({
    offers: filteredOffers,
  });
});

it(`Reducer should set top rated first order of offers`, () => {
  const filteredOffers = offers.sort((left, right) => right.rating - left.rating);

  expect(offersState({
    offers,
  }, {
    type: OffersActionType.SET_TOP_RATED_FIRST_ORDER_OFFERS,
    payload: filteredOffers,
  })).toEqual({
    offers: filteredOffers,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for set city returns correct action`, () => {
    expect(OffersActionCreator.getCurrentCity())
      .toEqual({
        type: OffersActionType.GET_CURRENT_CITY,
        payload: undefined,
      });
  });

  it(`Action creator for set city should returns "Moscow" value of city`, () => {
    expect(OffersActionCreator.getCurrentCity(`Moscow`))
    .toEqual({
      type: OffersActionType.GET_CURRENT_CITY,
      payload: `Moscow`,
    });
  });

  it(`Action creator for set default order returns correct action`, () => {
    expect(OffersActionCreator.setDefaultOrderOffers())
      .toEqual({
        type: OffersActionType.SET_DEFAULT_ORDER_OFFERS,
        payload: undefined,
      });
  });

  it(`Action creator for set default order should returns same "Offers"`, () => {
    expect(OffersActionCreator.setDefaultOrderOffers(offers))
    .toEqual({
      type: OffersActionType.SET_DEFAULT_ORDER_OFFERS,
      payload: offers,
    });
  });

  it(`Action creator for set low to high order returns correct action`, () => {
    expect(OffersActionCreator.setLowToHighOrderOffers())
      .toEqual({
        type: OffersActionType.SET_LOW_TO_HIGH_ORDER_OFFERS,
        payload: undefined,
      });
  });

  it(`Action creator for set low to high order should returns filtered "Offers"`, () => {
    const filteredOffers = offers.sort((left, right) => left.price - right.price);

    expect(OffersActionCreator.setLowToHighOrderOffers(filteredOffers)).toEqual({
      type: OffersActionType.SET_LOW_TO_HIGH_ORDER_OFFERS,
      payload: filteredOffers,
    });
  });

  it(`Action creator for set high to low order returns correct action`, () => {
    expect(OffersActionCreator.setHighToLowOrderOffers())
      .toEqual({
        type: OffersActionType.SET_HIGH_TO_LOW_ORDER_OFFERS,
        payload: undefined,
      });
  });

  it(`Action creator for set high to low order should returns filtered "Offers"`, () => {
    const filteredOffers = offers.sort((left, right) => right.price - left.price);

    expect(OffersActionCreator.setHighToLowOrderOffers(filteredOffers)).toEqual({
      type: OffersActionType.SET_HIGH_TO_LOW_ORDER_OFFERS,
      payload: filteredOffers,
    });
  });

  it(`Action creator for set top rated first order returns correct action`, () => {
    expect(OffersActionCreator.setTopRatedFirstOrderOffers())
      .toEqual({
        type: OffersActionType.SET_TOP_RATED_FIRST_ORDER_OFFERS,
        payload: undefined,
      });
  });

  it(`Action creator for set top rated first order should returns filtered "Offers"`, () => {
    const filteredOffers = offers.sort((left, right) => right.rating - left.rating);

    expect(OffersActionCreator.setTopRatedFirstOrderOffers(filteredOffers)).toEqual({
      type: OffersActionType.SET_TOP_RATED_FIRST_ORDER_OFFERS,
      payload: filteredOffers,
    });
  });
});
