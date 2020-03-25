import React from 'react';
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";

const PrivateRoute = ({component: Component, authorizationStatus, condRedirect, linkRedirect, ...rest}) => {
  const {getData} = rest;

  return (
    <Route
      {...rest}
      render={(props) => (
      authorizationStatus === condRedirect
        ? <Component
            getData={getData}
            {...props}
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
  rest: PropTypes.object,
};

export default PrivateRoute;
