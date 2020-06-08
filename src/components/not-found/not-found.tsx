import * as React from 'react';
import {Link} from "react-router-dom";
import {AppRoute} from "../../enums";

const NotFound = () => {
  return (
    <React.Fragment>
      <h1>
        404.
        <br />
        <small>Page not found</small>
      </h1>

      <Link to={AppRoute.MAIN}>Go to main page</Link>
    </React.Fragment>
  );
};

export default NotFound;
