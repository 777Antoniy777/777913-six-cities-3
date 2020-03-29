import React from 'react';
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";

const PrivateRoute = ({component: Component, authorizationStatus, condRedirect, linkRedirect, getData}) => {

  return (
    <Route
      getData={getData}
      render={(props) => (
        authorizationStatus === condRedirect
          ? <Component
            {...props}
            authorizationStatus={authorizationStatus}
            getData={getData}
          />
          : <Redirect to={linkRedirect} />
      )}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
  authorizationStatus: PropTypes.string,
  condRedirect: PropTypes.string,
  linkRedirect: PropTypes.string,
  getData: PropTypes.func,
};

export default PrivateRoute;
