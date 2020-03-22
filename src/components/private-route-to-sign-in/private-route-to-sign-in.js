import React from 'react';
import {Route, Redirect} from "react-router-dom";

const PrivateRouteToSignIn = ({...rest}) => (
  <Route
    {...rest}
    render={props =>
      Boolean(window.__DONT_REPEAT_IT_AT_HOME__) ? (
        <Component {...props} />
      ) : (
        <Redirect to="/go-away" />
      )
    }
  />
);

export default PrivateRouteToSignIn;
