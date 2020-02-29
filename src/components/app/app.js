import React from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Main from '../main/main';
import Place from '../place/place';

const App = ({isShowOffer}) => {
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

  const offerScreen = renderOfferScreen();

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          {offerScreen}
        </Route>
        <Route path="/offer">
          <Place />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  isShowOffer: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isShowOffer: state.offer.isShowOffer,
});

export default connect(
    mapStateToProps
)(App);
