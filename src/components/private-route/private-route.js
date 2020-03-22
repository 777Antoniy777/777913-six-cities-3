import React from 'react';
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";
import {AuthorizationStatus, AppRoute} from "../../enums";

const PrivateRoute = ({component: Component, authorizationStatus, ...rest}) => {
  console.log(authorizationStatus)
  const showPrivateComponent = (props) => {
    if (authorizationStatus === AuthorizationStatus.AUTH) {
      return (
        <Component
          {...props}
        />
      );
    } else {
      return (
        <Redirect to={AppRoute.SIGN_IN} />
      );
    }
  };

  console.log(rest)

  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          showPrivateComponent(props)
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  rest: PropTypes.object,
};

export default PrivateRoute;
