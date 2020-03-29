const UserActionType = {
  SET_USER_REQUEST_STATUS: `SET_USER_REQUEST_STATUS`,
  SET_USER_REQUEST_MESSAGE: `SET_USER_REQUEST_MESSAGE`,
  SET_AUTHORIZATION_STATUS: `SET_AUTHORIZATION_STATUS`,
  GET_USER_DATA: `GET_USER_DATA`,
};

const UserActionCreator = {
  setUserRequestStatus: (status) => ({
    type: UserActionType.SET_USER_REQUEST_STATUS,
    payload: status,
  }),

  setUserRequestMessage: (message) => ({
    type: UserActionType.SET_USER_REQUEST_MESSAGE,
    payload: message,
  }),

  setAuthorizationStatus: (status) => ({
    type: UserActionType.SET_AUTHORIZATION_STATUS,
    payload: status,
  }),

  getUserData: (data) => ({
    type: UserActionType.GET_USER_DATA,
    payload: data,
  }),
};

export {UserActionType, UserActionCreator};
