import React from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {AppRoute} from "../../enums";
import {getAuthorizationStatus, getUserData} from "../../reducers/user/selectors";
import {getShowOfferStatus, getOffer} from "../../reducers/offer/selectors";
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

const App = ({isShowOffer, offer, authorizationStatus, userData}) => {
  let id;
  if (offer) {
    id = offer.id;
  }

  console.log(authorizationStatus);

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
          render={() => {
            return (
              <Main />
            );
          }}
        />

        <Route
          path={AppRoute.OFFER(id)}
          render={() => {
            return (
              <Place />
            );
          }}
        />

        <Route
          path={AppRoute.SIGN_IN}
          render={() => {
            return (
              <SignInWrappedHOC />
            );
          }}
        />

        <PrivateRoute
          path={AppRoute.FAVORITES}
          component={Favorites}
          authorizationStatus={authorizationStatus}
        />

      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  // isShowOffer: PropTypes.bool,
  offer: PropTypes.object,
  authorizationStatus: PropTypes.string,
  userData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  // isShowOffer: getShowOfferStatus(state),
  offer: getOffer(state),
  authorizationStatus: getAuthorizationStatus(state),
  userData: getUserData(state),
});

export default connect(
    mapStateToProps
)(App);
