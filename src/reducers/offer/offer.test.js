import offer from './offer';
import ActionType from '../../action-type';
import getCurrentOfferAction from '../../actions/getCurrentOfferAction';
import setOfferStatusAction from '../../actions/setOfferStatusAction';

it(`Offer without additional parameters should return initial state`, () => {
  expect(offer(void 0, {})).toEqual({
    offer: null,
    isShowOffer: false,
  });
});

it(`Reducer should get current offer`, () => {
  expect(offer({
    offer: null,
    isShowOffer: false,
  }, {
    type: ActionType.GET_CURRENT_OFFER,
    payload: undefined,
  })).toEqual({
    offer: undefined,
    isShowOffer: false,
  });
});

it(`Reducer should set offer status`, () => {
  expect(offer({
    offer: null,
    isShowOffer: false,
  }, {
    type: ActionType.SET_OFFER_STATUS,
    payload: undefined,
  })).toEqual({
    offer: null,
    isShowOffer: undefined,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for get current offer`, () => {
    expect(getCurrentOfferAction()).toEqual({
      type: ActionType.GET_CURRENT_OFFER,
      payload: undefined,
    });
  });

  it(`Action creator for set offer status`, () => {
    expect(setOfferStatusAction()).toEqual({
      type: ActionType.SET_OFFER_STATUS,
      payload: undefined,
    });
  });
});
