import * as React from "react";
import {Subtract} from "utility-types";
import {FilterType} from "../../enums";
import {Filter, Filters} from "../../types/main-types/filters-type";

interface State {
  isFilterOpened: boolean;
  filtersArr: Filters;
  currentFilter: Filter;
}

interface InjectingProps {
  isFilterOpened: boolean;
  currentFilter: Filter;
  filtersArr: Filters;
  setFilterStatus: () => void;
  getCurrentFilter: () => void;
}

const withPlaceFilter = (Component) => {
  type Props = React.ComponentProps<typeof Component>
  type RestProps = Subtract<Props, InjectingProps>;

  class WithPlaceFilter extends React.PureComponent<RestProps, State> {
    constructor(props) {
      super(props);
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

  return WithPlaceFilter;
};

export default withPlaceFilter;
