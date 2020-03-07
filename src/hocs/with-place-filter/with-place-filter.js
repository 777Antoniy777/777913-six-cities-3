import React from "react";
import PropTypes from "prop-types";
import FilterType from "../../enums";

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

      this.onSetFilterStatus = this.onSetFilterStatus.bind(this);
      this.onGetCurrentFilter = this.onGetCurrentFilter.bind(this);
    }

    filterOffers() {
      const {initialOffers, offers, onSetDefaultOrderOffers, onSetLowToHighOrderOffers, onSetHighToLowOrderOffers, onSetTopRatedFirstOrderOffers} = this.props;
      const {currentFilter} = this.state;
      const {id} = currentFilter;
      const clonnedInitialOffers = initialOffers.slice();

      switch (id) {
        case FilterType.DEFAULT:
          onSetDefaultOrderOffers(clonnedInitialOffers);
          break;
        case FilterType.LOW_TO_HIGH:
          offers.sort((left, right) => left.price - right.price);
          onSetLowToHighOrderOffers(offers);
          break;
        case FilterType.HIGH_TO_LOW:
          offers.sort((left, right) => right.price - left.price);
          onSetHighToLowOrderOffers(offers);
          break;
        case FilterType.TOP_RATED_FIRST:
          offers.sort((left, right) => right.rating - left.rating);
          onSetTopRatedFirstOrderOffers(offers);
          break;
        default:
          break;
      }
    }

    onSetFilterStatus() {
      this.setState((state) => ({
        isFilterOpened: !state.isFilterOpened,
      }));
    }

    onGetCurrentFilter(obj) {
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
          onSetFilterStatus={this.onSetFilterStatus}
          onGetCurrentFilter={this.onGetCurrentFilter}
        />
      );
    }
  }

  WithPlaceFilter.propTypes = {
    initialOffers: PropTypes.arrayOf(PropTypes.object),
    offers: PropTypes.arrayOf(PropTypes.object),
    onSetDefaultOrderOffers: PropTypes.func,
    onSetLowToHighOrderOffers: PropTypes.func,
    onSetHighToLowOrderOffers: PropTypes.func,
    onSetTopRatedFirstOrderOffers: PropTypes.func,
  };

  return WithPlaceFilter;
};

export default withPlaceFilter;
