import React from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {AuthorizationStatus, AppRoute} from "../../enums";
import {getAuthorizationStatus, getUserData} from "../../reducers/user/selectors";
import {getOffer} from "../../reducers/offer/selectors";
import PrivateRoute from "../private-route/private-route";
import withSignIn from "../../hocs/with-sign-in/with-sign-in";
import Main from '../main/main';
import Place from '../place/place';
import SignIn from "../sign-in/sign-in";
import Header from "../header/header";

const Favorites = () => {
  return (
    <p>Favorites</p>
  );
};

const SignInWrappedHOC = withSignIn(SignIn);

const App = ({offer, authorizationStatus, userData}) => {
  let id;

  if (!authorizationStatus) {
    return false;
  }

  if (offer) {
    id = offer.id;
  }

  return (
    <BrowserRouter>
      <Header
        // properties
        authorizationStatus={authorizationStatus}
        userData={userData}
      />

      <Switch>
        <Route
          path={AppRoute.MAIN} exact
          render={(props) => (
            <Main
              history={props.history}
            />
          )}
        />

        <Route
          path={AppRoute.OFFER(id)}
          render={(props) => (
            <Place
              history={props.history}
            />
          )}
        />

        <PrivateRoute
          // properties
          path={AppRoute.SIGN_IN}
          component={SignInWrappedHOC}
          condRedirect={AuthorizationStatus.NO_AUTH}
          linkRedirect={AppRoute.MAIN}
          authorizationStatus={authorizationStatus}
        />

        <PrivateRoute
          // properties
          path={AppRoute.FAVORITES}
          component={Favorites}
          condRedirect={AuthorizationStatus.AUTH}
          linkRedirect={AppRoute.SIGN_IN}
          authorizationStatus={authorizationStatus}
        />

      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  offer: PropTypes.object,
  authorizationStatus: PropTypes.string,
  userData: PropTypes.object,
  history: PropTypes.object,
};

const mapStateToProps = (state) => ({
  offer: getOffer(state),
  authorizationStatus: getAuthorizationStatus(state),
  userData: getUserData(state),
});

export default connect(
    mapStateToProps
)(App);
