import React from 'react';
import PropTypes from "prop-types";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Main from '../main/main';
import Place from '../place/place';

class App extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isShowOffer: false,
      placeData: null,
      splittedOffers: [],
    };
    this.onSetPlaceData = this.onSetPlaceData.bind(this);
    this.onSetPlaceStatus = this.onSetPlaceStatus.bind(this);
  }

  splitOffers() {
    const {offers} = this.props;
    const {placeData} = this.state;
    const clonnedOffers = offers.slice();
    let id;

    if (placeData) {
      id = placeData.id;
    }

    id = id - 1;

    clonnedOffers.splice(id, 1);
    const splittedOffers = clonnedOffers.slice(0, 3);

    this.setState({
      splittedOffers,
    });
  }

  onSetPlaceData(obj) {
    this.setState({
      placeData: obj,
    });
  }

  onSetPlaceStatus() {
    this.setState({
      isShowOffer: true,
    }, this.splitOffers);
  }

  renderOfferScreen() {
    const {isShowOffer, placeData, splittedOffers} = this.state;
    const {offers} = this.props;

    if (isShowOffer) {
      return (
        <Place
          // properties
          placeData={placeData}
          offers={splittedOffers}
          isShowOffer={isShowOffer}
          // handlers
          onSetPlaceData={this.onSetPlaceData}
          onSetPlaceStatus={this.onSetPlaceStatus}
        />
      );
    } else {
      return (
        <Main
          // properties
          offers={offers}
          isShowOffer={isShowOffer}
          // handlers
          onSetPlaceData={this.onSetPlaceData}
          onSetPlaceStatus={this.onSetPlaceStatus}
        />
      );
    }
  }

  render() {
    const offerScreen = this.renderOfferScreen();

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
  }
}

App.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object),
};

export default App;
