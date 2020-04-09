import React from "react";
import {Route, Redirect} from "react-router-dom";

type Props = {
  component: () => React.ReactElement,
  authorizationStatus: string,
  condRedirect: string,
  linkRedirect: string,
  getData: () => void,
};

const PrivateRoute: React.FC<Props> = ({component: Component, authorizationStatus, condRedirect, linkRedirect, getData}) => {

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

export default PrivateRoute;
