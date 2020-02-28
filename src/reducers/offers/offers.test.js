import offersState from './offers';
import ActionType from '../../action-type';
import changeCityAction from '../../actions/changeCityAction';
import offers from '../../mocks/offers';

it(`Offers without additional parameters should return initial state`, () => {
  expect(offersState(void 0, {})).toEqual({
    city: offers[0].city,
    offers,
  });
});

it(`Reducer should set current city`, () => {
  expect(offersState({
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
