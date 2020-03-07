import React from "react";
import PropTypes from "prop-types";

const withPlaceFilter = (Component) => {
  class WithPlaceFilter extends React.PureComponent {
    constructor() {
      super();
      this.state = {
        isFilterOpened: false,
        filtersArr: [
          {
            id: 1,
            value: `Popular`,
          },
          {
            id: 2,
            value: `Price: low to high`,
          },
          {
            id: 3,
            value: `Price: high to low`,
          },
          {
            id: 4,
            value: `Top rated first`,
          },
        ],
        currentFilter: {
          id: 1,
          value: `Popular`,
        },
      };

      this.onSetFilterStatus = this.onSetFilterStatus.bind(this);
      this.onGetCurrentFilter = this.onGetCurrentFilter.bind(this);
    }

    filterOffers() {
      const {onFilterOffers} = this.props;

      onFilterOffers(this.state.currentFilter);
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
    onFilterOffers: PropTypes.func,
  };

  return WithPlaceFilter;
};

export default withPlaceFilter;
