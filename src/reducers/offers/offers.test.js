import offers from './offers';
import ActionType from '../../action-type';
import changeCityAction from '../../actions/changeCityAction';

it(`Offers without additional parameters should return initial state`, () => {
  expect(offers(void 0, {})).toEqual({
    city: offers[0].city,
    offers,
  });
});

it(`Reducer should set current city`, () => {
  expect(offers({
    city: offers[0].city,
    offers,
  }, {
    type: ActionType.CHANGE_CITY,
    payload: undefined,
  })).toEqual({
    city: undefined,
    offers,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for set city`, () => {
    expect(changeCityAction()).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: undefined,
    });
  });
});
