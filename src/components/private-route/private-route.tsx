import React from "react";
import {Route, Redirect} from "react-router-dom";

type Props = {
  // component: () => React.ReactElement,
  path: string,
  authorizationStatus: string,
  condRedirect: string,
  linkRedirect: string,
  getData?: () => void,
  render: () => React.ReactElement
};

// component: Component,
const PrivateRoute: React.FC<Props> = ({authorizationStatus, condRedirect, linkRedirect, getData, render}) => {

  return (
    <Route
      // getData={getData}
      render={() => (
        authorizationStatus === condRedirect
          ? render()
          : <Redirect to={linkRedirect} />
      )}
    />

    // <Route
    //   getData={getData}
    //   render={(props) => (
    //     authorizationStatus === condRedirect
    //       ? <Component
    //           {...props}
    //           authorizationStatus={authorizationStatus}
    //           getData={getData}
    //         />
    //       : <Redirect to={linkRedirect} />
    //   )}
    // />
  );
};

export default PrivateRoute;
