const getAuthorizationStatus = (state) => {
  return state.user.authorizationStatus;
};

const getUserData = (state) => {
  return state.user.userData;
};

export {getAuthorizationStatus, getUserData};
