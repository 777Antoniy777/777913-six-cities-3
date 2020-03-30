import {AuthorizationStatus, StartResponseProperty, EndResponseProperty} from "../../enums";
import {UserActionCreator} from "./action-creator";

const createAdapter = (json) => {
  const obj = json;
  const newObj = {};
  let val = ``;

  for (let key in obj) {
    if (key) {
      val = obj[key];

      switch (key) {
        case StartResponseProperty.AVATAR_URL:
          newObj[EndResponseProperty.AVATAR] = val;
          break;
        case StartResponseProperty.IS_PRO:
          newObj[EndResponseProperty.STATUS] = val;
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

        dispatch(UserActionCreator.getUserData(response));
        dispatch(UserActionCreator.setAuthorizationStatus(AuthorizationStatus.AUTH));
        dispatch(UserActionCreator.setUserRequestStatus(`success`));
        dispatch(UserActionCreator.setUserRequestMessage(null));
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

        dispatch(UserActionCreator.getUserData(response));
        dispatch(UserActionCreator.setAuthorizationStatus(AuthorizationStatus.AUTH));
        dispatch(UserActionCreator.setUserRequestStatus(`success`));
        dispatch(UserActionCreator.setUserRequestMessage(null));
      })
      .catch((error) => {
        dispatch(UserActionCreator.setUserRequestStatus(`error`));
        dispatch(UserActionCreator.setUserRequestMessage(`Ошибка сервера. Повторите позже`));

        throw error;
      });
  },
};

export {UserAsyncActionCreator};
