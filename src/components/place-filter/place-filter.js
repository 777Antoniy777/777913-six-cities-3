import React from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import classNames from 'classnames';
import ActionCreator from '../../actions/action-creator';

const PlaceFilterItem = ({filter, currentFilter, onSetCurrentFilter}) => {
  const {value} = filter;
  const {value: currentValue} = currentFilter;

  const isFilterActive = (actFilter, curFilter) => {
    if (curFilter === actFilter) {
      return true;
    }

    return false;
  };

  const filterItemClass = classNames({
    'places__option': true,
    'places__option--active': isFilterActive(value, currentValue),
  });

  const handleItemClick = () => {
    onSetCurrentFilter(filter);
  };

  return (
    <li className={filterItemClass} tabIndex={0} onClick={handleItemClick}>{value}</li>
  );
};

class PlaceFilter extends React.PureComponent {
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

    this.handleListClick = this.handleListClick.bind(this);
    this.onSetCurrentFilter = this.onSetCurrentFilter.bind(this);
  }

  filterOffers() {
    const {initialOffers, offers, onSetDefaultOrderOffers, onSetLowToHighOrderOffers, onSetHighToLowOrderOffers, onSetTopRatedFirstOrderOffers} = this.props;
    const {currentFilter} = this.state;
    const {id} = currentFilter;
    const clonnedInitialOffers = initialOffers.slice();

    switch (id) {
      case 1:
        onSetDefaultOrderOffers(clonnedInitialOffers);
        break;
      case 2:
        offers.sort((left, right) => left.price - right.price);
        onSetLowToHighOrderOffers(offers);
        break;
      case 3:
        offers.sort((left, right) => right.price - left.price);
        onSetHighToLowOrderOffers(offers);
        break;
      case 4:
        offers.sort((left, right) => right.rating - left.rating);
        onSetTopRatedFirstOrderOffers(offers);
        break;
      default:
        break;
    }
  }

  handleListClick() {
    this.setState((state) => ({
      isFilterOpened: !state.isFilterOpened,
    }));
  }

  onSetCurrentFilter(obj) {
    this.setState({
      currentFilter: obj,
    }, this.filterOffers);
  }

  render() {
    const {isFilterOpened, filtersArr, currentFilter} = this.state;

    const filterListClass = classNames({
      'places__options': true,
      'places__options--custom': true,
      'places__options--opened': isFilterOpened,
    });

    return (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption" onClick={this.handleListClick}>Sort by</span>

        <span className="places__sorting-type" tabIndex={0} onClick={this.handleListClick}>
          {currentFilter.value}

          <svg className="places__sorting-arrow" width={7} height={4}>
            <use xlinkHref="#icon-arrow-select" />
          </svg>

        </span>

        {/* places__options--opened */}
        { isFilterOpened &&
          <ul className={filterListClass}>

            { filtersArr &&
              filtersArr.map((elem) =>
                <PlaceFilterItem
                  // properties
                  key={elem.id}
                  filter={elem}
                  currentFilter={currentFilter}
                  // handlers
                  onSetCurrentFilter={this.onSetCurrentFilter}
                />
              )}

          </ul>
        }

      </form>
    );
  }

}

PlaceFilterItem.propTypes = {
  filter: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
  }),
  currentFilter: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
  }),
  onSetCurrentFilter: PropTypes.func,
};

PlaceFilter.propTypes = {
  initialOffers: PropTypes.arrayOf(PropTypes.object),
  offers: PropTypes.arrayOf(PropTypes.object),
  onSetDefaultOrderOffers: PropTypes.func,
  onSetLowToHighOrderOffers: PropTypes.func,
  onSetHighToLowOrderOffers: PropTypes.func,
  onSetTopRatedFirstOrderOffers: PropTypes.func,
};

const mapStateToProps = (state) => ({
  initialOffers: state.offers.initialOffers,
  offers: state.offers.offers,
});

const mapDispatchToProps = (dispatch) => ({
  onSetDefaultOrderOffers: (offers) => {
    dispatch(ActionCreator.setDefaultOrderOffers(offers));
  },
  onSetLowToHighOrderOffers: (offers) => {
    dispatch(ActionCreator.setLowToHighOrderOffers(offers));
  },
  onSetHighToLowOrderOffers: (offers) => {
    dispatch(ActionCreator.setHighToLowOrderOffers(offers));
  },
  onSetTopRatedFirstOrderOffers: (offers) => {
    dispatch(ActionCreator.setTopRatedFirstOrderOffers(offers));
  },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlaceFilter);
