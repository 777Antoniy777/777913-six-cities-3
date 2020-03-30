const getUserRequestStatus = (state) => {
  return state.user.requestStatus;
};

const getUserRequestMessage = (state) => {
  return state.user.requestMessage;
};

const getAuthorizationStatus = (state) => {
  return state.user.authorizationStatus;
};

const getUserData = (state) => {
  return state.user.userData;
};

export {getUserRequestStatus, getUserRequestMessage, getAuthorizationStatus, getUserData};
