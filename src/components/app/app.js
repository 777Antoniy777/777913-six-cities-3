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
      index: null,
      placeData: null,
    };
    this.onSetPlaceData = this.onSetPlaceData.bind(this);
    this.onSetPlaceStatus = this.onSetPlaceStatus.bind(this);
  }

  // splitOffers() {
  //   const {offers} = this.props;
  //   const {placeData} = this.state;
  //   const clonnedOffers = offers.slice();
  //   let id;

  //   if (placeData) {
  //     id = placeData.id;
  //   }

  //   id = id - 1;

  //   clonnedOffers.splice(id, 1);
  //   const splittedOffers = clonnedOffers.slice(0, 3);

  //   return splittedOffers;
  // }

  onSetIndexPlaceData(index) {
    this.setState({
      index,
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
    });
  }

  // onSetPlaceStatus() {
  //   this.setState({
  //     isShowOffer: true,
  //   }, this.splitOffers);
  // }

  renderOfferScreen() {
    const {isShowOffer, index, placeData} = this.state;
    // const {offers} = this.props;
    // const splittedOffers = this.splitOffers();

    if (isShowOffer) {
      return (
        <Place
          // properties
          placeData={placeData}
          index={index}
          isShowOffer={isShowOffer}
          // handlers
          onSetPlaceData={this.onSetPlaceData}
          // продолжи с этого места
          onSetIndexPlaceData={this.onSetIndexPlaceData}
          onSetPlaceStatus={this.onSetPlaceStatus}
        />
      );
    } else {
      return (
        <Main
          // properties
          isShowOffer={isShowOffer}
          // handlers
          onSetPlaceData={this.onSetPlaceData}
          // продолжи с этого места
          onSetIndexPlaceData={this.onSetIndexPlaceData}
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
