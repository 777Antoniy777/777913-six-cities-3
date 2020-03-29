import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {AuthorizationStatus, AppRoute} from "../../enums";
import {getAuthorizationStatus} from "../../reducers/user/selectors";
// import {getOffer} from "../../reducers/offer/selectors";
import {FavoritesAsyncActionCreator} from "../../actions/favorites/async-action-creator";
import PrivateRoute from "../private-route/private-route";
import withSignIn from "../../hocs/with-sign-in/with-sign-in";
import withLoadData from "../../hocs/with-load-data/with-load-data";
import Main from '../main/main';
import Place from '../place/place';
import SignIn from "../sign-in/sign-in";
import Favorites from "../favorites/favorites";
import NotFound from "../not-found/not-found";

const SignInWrappedHOC = withSignIn(SignIn);
const FavoritesWrappedHOC = withLoadData(Favorites);

const App = ({authorizationStatus, getFavoriteOffers}) => {
  if (!authorizationStatus) {
    return false;
  }

  // let id;
  // if (offer) {
  //   id = offer.id;
  // }

  return (
    <BrowserRouter>
      <Switch>
        <Route
          path={AppRoute.MAIN} exact
          render={(props) => (
            <Main
              // properties
              {...props}
              authorizationStatus={authorizationStatus}
            />
          )}
        />

        <Route
          path={AppRoute.OFFER.ROUTE}
          render={(props) => (
            <Place
              // properties
              {...props}
              authorizationStatus={authorizationStatus}
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
          component={FavoritesWrappedHOC}
          condRedirect={AuthorizationStatus.AUTH}
          linkRedirect={AppRoute.SIGN_IN}
          authorizationStatus={authorizationStatus}
          // handlers
          getData={getFavoriteOffers}
        />

        <Route
          // properties
          path={AppRoute.NOT_FOUND.ROUTE}
          render={() => (<NotFound />)}
        />

      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  // offer: PropTypes.object,
  authorizationStatus: PropTypes.string,
  userData: PropTypes.object,
  getFavoriteOffers: PropTypes.func,
};

const mapStateToProps = (state) => ({
  // offer: getOffer(state),
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  getFavoriteOffers: (offers) => {
    dispatch(FavoritesAsyncActionCreator.getFavoriteOffers(offers));
  },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
