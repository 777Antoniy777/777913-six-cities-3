import React from "react";
import {Route, Redirect} from "react-router-dom";

type RouteProps = {};

type Props = {
  path: string,
  authorizationStatus: string,
  condRedirect: string,
  linkRedirect: string,
  render: (props: RouteProps) => React.ReactElement,
};

const PrivateRoute: React.FC<Props> = ({authorizationStatus, condRedirect, linkRedirect, render, path}) => {
  return (
    <Route
      path={path}
      render={(props) => (
        authorizationStatus === condRedirect
          ? render({...props})
          : <Redirect to={linkRedirect} />
      )}
    />
  );
};

export default PrivateRoute;
