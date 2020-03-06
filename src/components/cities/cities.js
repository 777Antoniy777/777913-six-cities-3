import React from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames';

const Cities = ({cities, currentCity, onGetActiveItem}) => {
  return (
    <ul className="locations__list tabs__list">

      { cities &&
        cities.map((elem) =>

          <City
            // properties
            key={elem}
            city={elem}
            currentCity={currentCity}
            // handlers
            onGetActiveItem={onGetActiveItem}
          />

        )
      }

    </ul>
  );
};

const City = ({city, currentCity, onGetActiveItem}) => {
  const handleLinkClick = (evt) => {
    evt.preventDefault();

    onGetActiveItem(city);
  };

  const isActiveLink = (actCity, curCity) => {
    if (curCity === actCity) {
      return true;
    }

    return false;
  };

  const cityItemClass = classNames({
    'locations__item-link': true,
    'tabs__item': true,
    'tabs__item--active': isActiveLink(currentCity, city),
  });

  return (
    <li className="locations__item" >
      <a className={cityItemClass} href="#" onClick={handleLinkClick}>
        <span>{city}</span>
      </a>
    </li>
  );
};

Cities.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string),
  currentCity: PropTypes.string,
  onGetActiveItem: PropTypes.func,
};

City.propTypes = {
  currentCity: PropTypes.string,
  city: PropTypes.string,
  onGetActiveItem: PropTypes.func,
};

export default Cities;
