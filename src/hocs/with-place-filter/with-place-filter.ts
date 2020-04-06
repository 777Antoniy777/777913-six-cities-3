import React from "react";
import PropTypes from "prop-types";
import {FilterType} from "../../enums";

const withPlaceFilter = (Component) => {
  class WithPlaceFilter extends React.PureComponent {
    constructor() {
      super();
      this.state = {
        isFilterOpened: false,
        filtersArr: [
          {
            id: FilterType.DEFAULT,
            value: `Popular`,
          },
          {
            id: FilterType.LOW_TO_HIGH,
            value: `Price: low to high`,
          },
          {
            id: FilterType.HIGH_TO_LOW,
            value: `Price: high to low`,
          },
          {
            id: FilterType.TOP_RATED_FIRST,
            value: `Top rated first`,
          },
        ],
        currentFilter: {
          id: FilterType.DEFAULT,
          value: `Popular`,
        },
      };

      this.setFilterStatus = this.setFilterStatus.bind(this);
      this.getCurrentFilter = this.getCurrentFilter.bind(this);
    }

    filterOffers() {
      const {initialOffers, offers, setDefaultOrderOffers, setLowToHighOrderOffers, setHighToLowOrderOffers, setTopRatedFirstOrderOffers} = this.props;
      const {currentFilter} = this.state;
      const {id} = currentFilter;
      const clonnedInitialOffers = initialOffers.slice();

      switch (id) {
        case FilterType.DEFAULT:
          setDefaultOrderOffers(clonnedInitialOffers);
          break;
        case FilterType.LOW_TO_HIGH:
          offers.sort((left, right) => left.price - right.price);
          setLowToHighOrderOffers(offers);
          break;
        case FilterType.HIGH_TO_LOW:
          offers.sort((left, right) => right.price - left.price);
          setHighToLowOrderOffers(offers);
          break;
        case FilterType.TOP_RATED_FIRST:
          offers.sort((left, right) => right.rating - left.rating);
          setTopRatedFirstOrderOffers(offers);
          break;
        default:
          break;
      }
    }

    setFilterStatus() {
      this.setState((state) => ({
        isFilterOpened: !state.isFilterOpened,
      }));
    }

    getCurrentFilter(obj) {
      this.setState({
        currentFilter: obj,
      }, this.filterOffers);
    }

    render() {
      const {isFilterOpened, currentFilter, filtersArr} = this.state;

      return (
        <Component
          {...this.props}
          isFilterOpened={isFilterOpened}
          currentFilter={currentFilter}
          filtersArr={filtersArr}
          setFilterStatus={this.setFilterStatus}
          getCurrentFilter={this.getCurrentFilter}
        />
      );
    }
  }

  WithPlaceFilter.propTypes = {
    initialOffers: PropTypes.arrayOf(
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
          location: PropTypes.shape({
            latitude: PropTypes.number,
            longitude: PropTypes.number,
            zoom: PropTypes.number,
          }),
        })
    ),
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
          location: PropTypes.shape({
            latitude: PropTypes.number,
            longitude: PropTypes.number,
            zoom: PropTypes.number,
          }),
        })
    ),
    setDefaultOrderOffers: PropTypes.func,
    setLowToHighOrderOffers: PropTypes.func,
    setHighToLowOrderOffers: PropTypes.func,
    setTopRatedFirstOrderOffers: PropTypes.func,
  };

  return WithPlaceFilter;
};

export default withPlaceFilter;
