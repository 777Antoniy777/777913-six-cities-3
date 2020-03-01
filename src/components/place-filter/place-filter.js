import React from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames';

const PlaceFilterItem = ({filter, onSetCurrentFilter}) => {
  const {value} = filter;

  const filterItemClass = classNames({
    'places__option': true,
  });


  const handleItemClick = () => {
    onSetCurrentFilter(filter);
  };

  return (
    // places__option--active
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
          value: `high to low`,
        },
        {
          id: 4,
          value: `Top rated first`,
        },
      ],
      currentFilter: {},
    };

    this.handleListClick = this.handleListClick.bind(this);
    this.onSetCurrentFilter = this.onSetCurrentFilter.bind(this);
  }


  handleListClick() {
    this.setState((state) => ({
      isFilterOpened: !state.isFilterOpened,
    }));
  }

  onSetCurrentFilter(obj) {
    this.setState({
      currentFilter: obj,
    });
  }

  render() {
    const {isFilterOpened, filtersArr} = this.state;

    const filterListClass = classNames({
      'places__options': true,
      'places__options--custom': true,
      'places__options--opened': isFilterOpened,
    });

    return (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption" onClick={this.handleListClick}>Sort by</span>

        <span className="places__sorting-type" tabIndex={0} onClick={this.handleListClick}>
                    Popular
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

export default PlaceFilter;
