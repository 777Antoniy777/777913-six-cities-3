import {AuthorizationStatus} from "../../enums";
import {UserActionCreator} from "./action-creator";

const options = {
  email: `tat7106@gmail.com`,
  password: `123`,
};

const UserAsyncActionCreator = {
  checkUserStatus: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        // console.log(response, response.data);
        response = response.data;

        dispatch(UserActionCreator.setAuthorizationStatus(AuthorizationStatus.AUTH));
        dispatch(UserActionCreator.getUserData(response));
      })
      .catch(function (error) {
        throw error;
      });
  },

  login: () => (dispatch, getState, api) => {
    return api.post(`/login`, options)
      .then((response) => {
        // console.log(response, response.data);
        response = response.data;

        dispatch(UserActionCreator.setAuthorizationStatus(AuthorizationStatus.AUTH));
        dispatch(UserActionCreator.getUserData(response));
      })
      .catch(function (error) {
        throw error;
      });
  },
};

export {UserAsyncActionCreator};
