import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const PlaceFilter = ({isFilterOpened, currentFilter, filtersArr, setFilterStatus, getCurrentFilter}) => {
  const filterListClass = classNames({
    'places__options': true,
    'places__options--custom': true,
    'places__options--opened': isFilterOpened,
  });

  const handleListClick = () => {
    setFilterStatus();
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption" onClick={handleListClick}>Sort by</span>

      <span className="places__sorting-type" tabIndex={0} onClick={handleListClick}>
        {currentFilter.value}

        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>

      </span>

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
                getCurrentFilter={getCurrentFilter}
              />
            )}

        </ul>
      }

    </form>
  );
};

const PlaceFilterItem = ({filter, currentFilter, getCurrentFilter}) => {
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
    getCurrentFilter(filter);
  };

  return (
    <li className={filterItemClass} tabIndex={0} onClick={handleItemClick}>{value}</li>
  );
};

PlaceFilter.propTypes = {
  isFilterOpened: PropTypes.bool,
  currentFilter: PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.string,
  }),
  filtersArr: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        value: PropTypes.string,
      })
  ),
  setFilterStatus: PropTypes.func,
  getCurrentFilter: PropTypes.func,
};

PlaceFilterItem.propTypes = {
  filter: PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.string,
  }),
  currentFilter: PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.string,
  }),
  getCurrentFilter: PropTypes.func,
};

export default PlaceFilter;
