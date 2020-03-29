import React from "react";
import PropTypes from "prop-types";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import PreviewPlaces from "../preview-places/preview-places";

const PreviewPlacesWrappedHoc = withActiveItem(PreviewPlaces);

const FavoriteCities = ({favoriteOffers, favoriteCities, history, location, getCurrentOffer}) => {
  return (
    <ul className="favorites__list">

      { favoriteCities &&
        favoriteCities.map((elem) =>
          <FavoriteCity
            // properties
            key={elem}
            favoriteOffers={favoriteOffers}
            favoriteCity={elem}
            history={history}
            location={location}
            // handlers
            getCurrentOffer={getCurrentOffer}
          />
        )}

    </ul>
  );
};

const FavoriteCity = ({favoriteOffers, favoriteCity, history, location, getCurrentOffer}) => {
  const filterFavoriteOffers = (city) => {
    return favoriteOffers.filter((elem) => {
      return elem.city.name.includes(city);
    });
  };

  return (
    <li className="favorites__locations-items">

      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{favoriteCity}</span>
          </a>
        </div>
      </div>

      <div className="favorites__places">

        {/* рендерит превью мест */}
        <PreviewPlacesWrappedHoc
          // properties
          offers={filterFavoriteOffers(favoriteCity)}
          history={history}
          location={location}
          // handlers
          getActiveItem={getCurrentOffer}
        />

      </div>

    </li>
  );
};

FavoriteCities.propTypes = {
  favoriteOffers: PropTypes.arrayOf(PropTypes.object),
  favoriteCities: PropTypes.arrayOf(PropTypes.string),
  history: PropTypes.object,
  location: PropTypes.object,
  getCurrentOffer: PropTypes.func,
};

FavoriteCity.propTypes = {
  favoriteOffers: PropTypes.arrayOf(PropTypes.object),
  favoriteCity: PropTypes.string,
  history: PropTypes.object,
  location: PropTypes.object,
  getCurrentOffer: PropTypes.func,
};

export default FavoriteCities;
