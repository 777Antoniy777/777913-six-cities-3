import * as React from "react";
import classNames from "classnames";
import {Filter, Filters} from "../../types/main-types/filters-type";

type PlaceFilterProps = {
  isFilterOpened: boolean;
  currentFilter: Filter;
  filtersArr: Filters;
  setFilterStatus: () => void;
  getCurrentFilter: (filter: Filter) => void;
};

type PlaceFilterItemProps = {
  filter: Filter;
  currentFilter: Filter;
  getCurrentFilter: (filter: Filter) => void;
};

const PlaceFilter: React.FC<PlaceFilterProps> = ({isFilterOpened, currentFilter, filtersArr, setFilterStatus, getCurrentFilter}: PlaceFilterProps) => {
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

const PlaceFilterItem: React.FC<PlaceFilterItemProps> = ({filter, currentFilter, getCurrentFilter}: PlaceFilterItemProps) => {
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

export default PlaceFilter;
