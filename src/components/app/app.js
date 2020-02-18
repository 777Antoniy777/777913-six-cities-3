import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Main from '../main/main';
import Place from '../place/place';

class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      isShowOffer: false,
      placeData: null,
    };
    this.onSetPlaceData = this.onSetPlaceData.bind(this);
    this.onSetPlaceStatus = this.onSetPlaceStatus.bind(this);
  }

  onSetPlaceData(obj) {
    this.setState({
      placeData: obj,
    });
  }

  onSetPlaceStatus() {
    this.setState((state) => ({
      isShowOffer: !state.isShowOffer,
    }));
  }

  renderOfferScreen() {
    const {isShowOffer, placeData} = this.state;
    const {rentAmount, offers} = this.props;

    if (isShowOffer) {
      return (
        <Place
          // properties
          placeData={placeData}
        />
      );
    } else {
      return (
        <Main
          // properties
          rentAmount={rentAmount}
          offers={offers}
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

App.defaultProps = {
  rentAmount: 0,
};

App.propTypes = {
  rentAmount: PropTypes.number.isRequired,
  offers: PropTypes.arrayOf(
      PropTypes.object.isRequired
  ).isRequired,
};

export default App;
