import {AuthorizationStatus} from "../../enums";
import {UserActionCreator} from "./action-creator";

const createAdapter = (json) => {
  const obj = json;
  const newObj = {};
  let val = ``;

  for (let key in obj) {
    if (key) {
      val = obj[key];

      switch (key) {
        case `avatar_url`:
          newObj.avatar = val;
          break;
        case `is_pro`:
          newObj.status = val;
          break;
        default:
          newObj[key] = val;
          break;
      }

    }
  }

  return newObj;
};

const setOptions = (email, password) => ({
  email,
  password,
});

const UserAsyncActionCreator = {
  checkUserStatus: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        response = createAdapter(response.data);

        dispatch(UserActionCreator.setAuthorizationStatus(AuthorizationStatus.AUTH));
        dispatch(UserActionCreator.getUserData(response));
      })
      .catch((error) => {
        throw error;
      });
  },

  login: (email, password) => (dispatch, getState, api) => {
    const options = setOptions(email, password);

    return api.post(`/login`, options)
      .then((response) => {
        response = createAdapter(response.data);

        dispatch(UserActionCreator.setAuthorizationStatus(AuthorizationStatus.AUTH));
        dispatch(UserActionCreator.getUserData(response));
      })
      .catch((error) => {
        throw error;
      });
  },
};

export {UserAsyncActionCreator};
