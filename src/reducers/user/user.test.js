import MockAdapter from "axios-mock-adapter";
import createAPI from "../../api.js";
import {AuthorizationStatus} from "../../enums";
import userState from './user';
import {UserActionType, UserActionCreator} from "../../actions/user/action-creator";
import {UserAsyncActionCreator} from "../../actions/user/async-action-creator";

const api = createAPI(() => {});

const userData = {
  id: 1,
  name: `name`,
  avatar: `avatar`,
  status: true,
};

it(`User without additional parameters should return initial state`, () => {
  expect(userState(void 0, {})).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    userData: null,
  });
});

it(`Reducer should set authorizationStatus "NO_AUTH" if beginning value was "NO_AUTH"`, () => {
  expect(userState({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  }, {
    type: UserActionType.SET_AUTHORIZATION_STATUS,
    payload: AuthorizationStatus.NO_AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  });
});

it(`Reducer should set authorizationStatus "AUTH" if beginning value was "NO_AUTH"`, () => {
  expect(userState({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  }, {
    type: UserActionType.SET_AUTHORIZATION_STATUS,
    payload: AuthorizationStatus.AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
  });
});

it(`Reducer should set authorizationStatus "NO_AUTH" if beginning value was "AUTH"`, () => {
  expect(userState({
    authorizationStatus: AuthorizationStatus.AUTH,
  }, {
    type: UserActionType.SET_AUTHORIZATION_STATUS,
    payload: AuthorizationStatus.NO_AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  });
});

it(`Reducer should set authorizationStatus "AUTH" if beginning value was "AUTH"`, () => {
  expect(userState({
    authorizationStatus: AuthorizationStatus.AUTH,
  }, {
    type: UserActionType.SET_AUTHORIZATION_STATUS,
    payload: AuthorizationStatus.AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
  });
});

it(`Reducer should set userData`, () => {
  expect(userState({
    userData: null,
  }, {
    type: UserActionType.GET_USER_DATA,
    payload: userData,
  })).toEqual({
    userData,
  });
});

describe(`Async action creator work correctly`, () => {
  it(`Should make a correct GET request to /login`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkUserStatus = UserAsyncActionCreator.checkUserStatus();

    apiMock
      .onGet(`/login`)
      .reply(200, userData);

    return checkUserStatus(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: UserActionType.SET_AUTHORIZATION_STATUS,
          payload: AuthorizationStatus.AUTH,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: UserActionType.GET_USER_DATA,
          payload: userData,
        });
      });
  });

  it(`Should make a correct POST request to /login`, function () {
    const apiMock = new MockAdapter(api);
    const email = `email`;
    const password = `password`;
    const dispatch = jest.fn();
    const login = UserAsyncActionCreator.login(email, password);

    apiMock
      .onPost(`/login`, {email, password})
      .reply(200, userData);

    return login(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: UserActionType.SET_AUTHORIZATION_STATUS,
          payload: AuthorizationStatus.AUTH,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: UserActionType.GET_USER_DATA,
          payload: userData,
        });
      });
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for set authorization status should return "AUTH" value`, () => {
    expect(UserActionCreator.setAuthorizationStatus(AuthorizationStatus.AUTH))
    .toEqual({
      type: UserActionType.SET_AUTHORIZATION_STATUS,
      payload: AuthorizationStatus.AUTH,
    });
  });

  it(`Action creator for set authorization status should return "NO_AUTH" value`, () => {
    expect(UserActionCreator.setAuthorizationStatus(AuthorizationStatus.NO_AUTH))
    .toEqual({
      type: UserActionType.SET_AUTHORIZATION_STATUS,
      payload: AuthorizationStatus.NO_AUTH,
    });
  });

  it(`Action creator for set user data should return "userData" value`, () => {
    expect(UserActionCreator.getUserData(userData))
    .toEqual({
      type: UserActionType.GET_USER_DATA,
      payload: userData,
    });
  });
});
