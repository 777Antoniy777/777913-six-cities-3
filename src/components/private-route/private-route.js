import React from 'react';
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";

const PrivateRoute = ({component: Component, authorizationStatus, condRedirect, linkRedirect, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => (
      authorizationStatus === condRedirect
        ? <Component {...props} />
        : <Redirect to={linkRedirect} />
      )}
    />
  );
};

PrivateRoute.propTypes = {
  rest: PropTypes.object,
};

export default PrivateRoute;
