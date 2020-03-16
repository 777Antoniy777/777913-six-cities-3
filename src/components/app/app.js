import React from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {getAuthorizationStatus, getUserData} from "../../reducers/user/selectors";
import {getShowOfferStatus} from "../../reducers/offer/selectors";
import withSignIn from "../../hocs/with-sign-in/with-sign-in";
import Main from '../main/main';
import Place from '../place/place';
import SignIn from "../sign-in/sign-in";
import Header from "../header/header";

const SignInWrappedHOC = withSignIn(SignIn);

const App = ({isShowOffer, authorizationStatus, userData}) => {
  const renderOfferScreen = () => {

    if (isShowOffer) {
      return (
        <Place />
      );
    } else {
      return (
        <Main />
      );
    }
  };

  return (
    <BrowserRouter>
      <Header
        // properties
        authorizationStatus={authorizationStatus}
        userData={userData}
      />

      <Switch>
        <Route path="/" exact>
          {renderOfferScreen()}
        </Route>
        <Route path="/offer">
          <Place />
        </Route>
        <Route path="/signin">
          <SignInWrappedHOC />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  isShowOffer: PropTypes.bool,
  authorizationStatus: PropTypes.string,
  userData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isShowOffer: getShowOfferStatus(state),
  authorizationStatus: getAuthorizationStatus(state),
  userData: getUserData(state),
});

export default connect(
    mapStateToProps
)(App);
