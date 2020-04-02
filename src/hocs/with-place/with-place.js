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

      if (offer) {
        getActiveItem(offer);
      }

      getReviews(+routeParameter);
      getNearbyOffers(+routeParameter);
    }

    componentDidUpdate() {
      const {getReviews, getNearbyOffers, getActiveItem, match} = this.props;
      const routeParameter = match.params.hotelID;
      const offer = this.getCurrentOffer();

      getActiveItem(offer);
      getReviews(+routeParameter);
      getNearbyOffers(+routeParameter);
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
    offers: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          city: PropTypes.shape({
            name: PropTypes.string,
            location: PropTypes.shape({
              latitude: PropTypes.number,
              longitude: PropTypes.number,
              zoom: PropTypes.number,
            }),
          }),
          title: PropTypes.string,
          premium: PropTypes.bool,
          favorite: PropTypes.bool,
          src: PropTypes.string,
          photos: PropTypes.arrayOf(PropTypes.string),
          price: PropTypes.number,
          description: PropTypes.string,
          type: PropTypes.string,
          rating: PropTypes.number,
          bedroomAmount: PropTypes.number,
          guestsAmount: PropTypes.number,
          items: PropTypes.arrayOf(PropTypes.string),
          host: PropTypes.shape({
            avatar: PropTypes.string,
            id: PropTypes.number,
            name: PropTypes.string,
            status: PropTypes.bool,
          }),
        })
    ),
    routeParameter: PropTypes.string,
    match: PropTypes.shape({
      isExact: PropTypes.bool,
      params: PropTypes.shape({
        hotelID: PropTypes.string,
      }),
      path: PropTypes.string,
      url: PropTypes.string,
    }),
    history: PropTypes.shape({
      action: PropTypes.string,
      block: PropTypes.func,
      createHref: PropTypes.func,
      go: PropTypes.func,
      goBack: PropTypes.func,
      goForward: PropTypes.func,
      length: PropTypes.number,
      listen: PropTypes.func,
      location: PropTypes.shape({
        hash: PropTypes.string,
        key: PropTypes.string,
        pathname: PropTypes.string,
        search: PropTypes.string,
        state: PropTypes.string,
      }),
      push: PropTypes.func,
      replace: PropTypes.func,
    }),
    getActiveItem: PropTypes.func,
    getReviews: PropTypes.func,
    getNearbyOffers: PropTypes.func,
  };

  return WithPlace;
};

export default withPlace;
