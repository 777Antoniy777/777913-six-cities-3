import React from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames';

const City = ({city, onGetCity, currentCity}) => {
  const handleLinkClick = (evt) => {
    evt.preventDefault();

    onGetCity(city);
  };

  const isActiveLink = (actCity, curCity) => {
    if (curCity === actCity) {
      return true;
    }

    return false;
  };

  const activeCityClass = classNames({
    'locations__item-link': true,
    'tabs__item': true,
    'tabs__item--active': isActiveLink(currentCity, city),
  });

  return (
    <li className="locations__item" >
      <a className={activeCityClass} href="#" onClick={handleLinkClick}>
        <span>{city}</span>
      </a>
    </li>
  );
};

const Cities = ({cities, onGetCity, currentCity}) => {
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
            onGetCity={onGetCity}
          />

        )
      }

    </ul>
  );
};

City.propTypes = {
  currentCity: PropTypes.string,
  city: PropTypes.string,
  onGetCity: PropTypes.func,
};

Cities.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string),
  currentCity: PropTypes.string,
  onGetCity: PropTypes.func,
};

export default Cities;
