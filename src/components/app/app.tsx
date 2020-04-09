import React from "react";
// import PropTypes from "prop-types";
import {connect} from "react-redux";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {AuthorizationStatus, AppRoute} from "../../enums";
import {getAuthorizationStatus} from "../../reducers/user/selectors";
import {getInitialOffers} from "../../reducers/offers/selectors";
import {OfferActionCreator} from "../../actions/offer/action-creator";
import {OffersAsyncActionCreator} from "../../actions/offers/async-action-creator";
import {ReviewsAsyncActionCreator} from "../../actions/reviews/async-action-creator";
import {FavoritesAsyncActionCreator} from "../../actions/favorites/async-action-creator";
import PrivateRoute from "../private-route/private-route";
import withSignIn from "../../hocs/with-sign-in/with-sign-in";
import withLoadData from "../../hocs/with-load-data/with-load-data";
import withPlace from "../../hocs/with-place/with-place";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import Main from '../main/main';
import Place from '../place/place';
import SignIn from "../sign-in/sign-in";
import Favorites from "../favorites/favorites";
import NotFound from "../not-found/not-found";

type Props = {
  authorizationStatus: string,
  offers: Offers,
  getFavoriteOffers: (offers: Offers) => void,
  getCurrentOffer: (offer: Offer) => void,
  getReviews: (offerId: number) => void,
  getNearbyOffers: (offerId: number) => void,
};

const SignInWrappedHOC = withSignIn(SignIn);
const FavoritesWrappedHOC = withLoadData(Favorites);
const PlaceWrappedHOC = withActiveItem(withPlace(Place));

const App: React.FC<Props> = ({authorizationStatus, offers, getFavoriteOffers, getCurrentOffer, getReviews, getNearbyOffers}) => {
  if (!authorizationStatus) {
    return false;
  }

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
            <PlaceWrappedHOC
              // properties
              {...props}
              authorizationStatus={authorizationStatus}
              offers={offers}
              // handlers
              getReviews={getReviews}
              getNearbyOffers={getNearbyOffers}
              getActiveItem={getCurrentOffer}
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

// App.propTypes = {
//   authorizationStatus: PropTypes.string,
//   offers: PropTypes.arrayOf(
//       PropTypes.shape({
//         id: PropTypes.number,
//         city: PropTypes.shape({
//           name: PropTypes.string,
//           location: PropTypes.shape({
//             latitude: PropTypes.number,
//             longitude: PropTypes.number,
//             zoom: PropTypes.number,
//           }),
//         }),
//         title: PropTypes.string,
//         premium: PropTypes.bool,
//         favorite: PropTypes.bool,
//         src: PropTypes.string,
//         photos: PropTypes.arrayOf(PropTypes.string),
//         price: PropTypes.number,
//         description: PropTypes.string,
//         type: PropTypes.string,
//         rating: PropTypes.number,
//         bedroomAmount: PropTypes.number,
//         guestsAmount: PropTypes.number,
//         items: PropTypes.arrayOf(PropTypes.string),
//         host: PropTypes.shape({
//           avatar: PropTypes.string,
//           id: PropTypes.number,
//           name: PropTypes.string,
//           status: PropTypes.bool,
//         }),
//         location: PropTypes.shape({
//           latitude: PropTypes.number,
//           longitude: PropTypes.number,
//           zoom: PropTypes.number,
//         }),
//       })
//   ),
//   getFavoriteOffers: PropTypes.func,
//   getCurrentOffer: PropTypes.func,
//   getReviews: PropTypes.func,
//   getNearbyOffers: PropTypes.func,
// };

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  offers: getInitialOffers(state),
});

const mapDispatchToProps = (dispatch) => ({
  getFavoriteOffers: (offers) => {
    dispatch(FavoritesAsyncActionCreator.getFavoriteOffers(offers));
  },
  getReviews: (offerId) => {
    dispatch(ReviewsAsyncActionCreator.getReviews(offerId));
  },
  getNearbyOffers: (offerId) => {
    dispatch(OffersAsyncActionCreator.getNearbyOffers(offerId));
  },
  getCurrentOffer: (offer) => {
    dispatch(OfferActionCreator.getCurrentOffer(offer));
  },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
