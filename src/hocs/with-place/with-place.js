import React from "react";
import PropTypes from "prop-types";
import {AppRoute} from "../../enums";

const withPlace = (Component) => {
  class WithPlace extends React.Component {

    shouldComponentUpdate(nextProps) {
      const {match} = this.props;
      const routeParameter = match.params.hotelID;

      if (routeParameter === nextProps.routeParameter) {
        return false;
      }

      return true;
    }

    componentDidMount() {
      const {getReviews, getNearbyOffers, getActiveItem, match} = this.props;
      const routeParameter = match.params.hotelID;
      const offer = this.getCurrentOffer();

      getReviews(+routeParameter);
      getNearbyOffers(+routeParameter);

      if (offer) {
        getActiveItem(offer);
      }
    }

    componentDidUpdate() {
      const {getReviews, getNearbyOffers, getActiveItem, match} = this.props;
      const routeParameter = match.params.hotelID;
      const offer = this.getCurrentOffer();

      getReviews(+routeParameter);
      getNearbyOffers(+routeParameter);
      getActiveItem(offer);
    }

    getCurrentOffer() {
      const {offers, history, match} = this.props;
      const routeParameter = match.params.hotelID;

      if (offers.length === 0) {
        return false;
      }

      if (routeParameter > offers.length) {
        history.replace(AppRoute.NOT_FOUND.LINK);
        return false;
      }

      const offer = offers.find((elem) => elem.id === +routeParameter);

      return offer;
    }

    render() {
      const offer = this.getCurrentOffer();

      return (
        <Component
          {...this.props}
          offer={offer}
        />
      );
    }
  }

  WithPlace.propTypes = {
    offers: PropTypes.arrayOf(PropTypes.object),
    routeParameter: PropTypes.string,
    match: PropTypes.object,
    history: PropTypes.object,
    getActiveItem: PropTypes.func,
    getReviews: PropTypes.func,
    getNearbyOffers: PropTypes.func,
  };

  return WithPlace;
};

export default withPlace;
