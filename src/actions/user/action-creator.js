const UserActionType = {
  SET_AUTHORIZATION_STATUS: `SET_AUTHORIZATION_STATUS`,
  GET_USER_DATA: `GET_USER_DATA`,
};

const UserActionCreator = {
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
