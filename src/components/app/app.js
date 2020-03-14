import React from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {getShowOfferStatus} from "../../reducers/offer/selectors";
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

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          {renderOfferScreen()}
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
  isShowOffer: getShowOfferStatus(state),
});

export default connect(
    mapStateToProps
)(App);
