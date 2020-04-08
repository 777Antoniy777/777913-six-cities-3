import React from "react";
import classNames from "classnames";

type CitiesProps = {
  cities: string[],
  currentCity: string,
  getActiveItem: () => void,
};

type CityProps = {
  city: string,
  currentCity: string,
  getActiveItem: (city: string) => void,
};

const Cities: React.FC<CitiesProps> = ({cities, currentCity, getActiveItem}) => {
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
            getActiveItem={getActiveItem}
          />

        )
      }

    </ul>
  );
};

const City: React.FC<CityProps> = ({city, currentCity, getActiveItem}) => {
  const handleLinkClick = (evt) => {
    evt.preventDefault();

    getActiveItem(city);
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

export default Cities;
