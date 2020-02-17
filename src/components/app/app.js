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
    };
  }

  renderOfferScreen() {
    const {isShowOffer} = this.state;
    const {rentAmount, offers} = this.props;

    if (isShowOffer) {
      return (
        <Place />
      );
    } else {
      return (
        <Main
          // properties
          rentAmount={ rentAmount }
          offers={ offers }
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
      PropTypes.exact({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
      })
  ),
};

export default App;
