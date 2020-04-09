import React from "react";
import {Subtract} from "utility-types";
import {AppRoute} from "../../enums";

interface InjectingProps {
  offer: Offer;
}

const withPlace = (Component) => {
  type Props = React.ComponentProps<typeof Component>;
  type RestProps = Subtract<Props, InjectingProps>;

  class WithPlace extends React.Component<RestProps, {}> {

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

  return WithPlace;
};

export default withPlace;
