import React from "react";
import PropTypes from "prop-types";
import PreviewPlaces from "../preview-places/preview-places";

const FavoriteCities = ({favoriteOffers, favoriteCities, history, location}) => {
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
          />
        )}

    </ul>
  );
};

const FavoriteCity = ({favoriteOffers, favoriteCity, history, location}) => {
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
        <PreviewPlaces
          // properties
          offers={filterFavoriteOffers(favoriteCity)}
          history={history}
          location={location}
        />

      </div>

    </li>
  );
};

FavoriteCities.propTypes = {
  favoriteOffers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        city: PropTypes.shape({
          name: PropTypes.string,
          location: PropTypes.shape({
            latitude: PropTypes.number,
            longitude: PropTypes.number,
            zoom: PropTypes.number,
          }),
        }),
        title: PropTypes.string,
        premium: PropTypes.bool,
        favorite: PropTypes.bool,
        src: PropTypes.string,
        photos: PropTypes.arrayOf(PropTypes.string),
        price: PropTypes.number,
        description: PropTypes.string,
        type: PropTypes.string,
        rating: PropTypes.number,
        bedroomAmount: PropTypes.number,
        guestsAmount: PropTypes.number,
        items: PropTypes.arrayOf(PropTypes.string),
        host: PropTypes.shape({
          avatar: PropTypes.string,
          id: PropTypes.number,
          name: PropTypes.string,
          status: PropTypes.bool,
        }),
      })
  ),
  favoriteCities: PropTypes.arrayOf(PropTypes.string),
  history: PropTypes.shape({
    action: PropTypes.string,
    block: PropTypes.func,
    createHref: PropTypes.func,
    go: PropTypes.func,
    goBack: PropTypes.func,
    goForward: PropTypes.func,
    length: PropTypes.number,
    listen: PropTypes.func,
    location: PropTypes.shape({
      hash: PropTypes.string,
      key: PropTypes.string,
      pathname: PropTypes.string,
      search: PropTypes.string,
      state: PropTypes.string,
    }),
    push: PropTypes.func,
    replace: PropTypes.func,
  }),
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    state: PropTypes.string,
  }),
};

FavoriteCity.propTypes = {
  favoriteOffers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        city: PropTypes.shape({
          name: PropTypes.string,
          location: PropTypes.shape({
            latitude: PropTypes.number,
            longitude: PropTypes.number,
            zoom: PropTypes.number,
          }),
        }),
        title: PropTypes.string,
        premium: PropTypes.bool,
        favorite: PropTypes.bool,
        src: PropTypes.string,
        photos: PropTypes.arrayOf(PropTypes.string),
        price: PropTypes.number,
        description: PropTypes.string,
        type: PropTypes.string,
        rating: PropTypes.number,
        bedroomAmount: PropTypes.number,
        guestsAmount: PropTypes.number,
        items: PropTypes.arrayOf(PropTypes.string),
        host: PropTypes.shape({
          avatar: PropTypes.string,
          id: PropTypes.number,
          name: PropTypes.string,
          status: PropTypes.bool,
        }),
      })
  ),
  favoriteCity: PropTypes.string,
  history: PropTypes.shape({
    action: PropTypes.string,
    block: PropTypes.func,
    createHref: PropTypes.func,
    go: PropTypes.func,
    goBack: PropTypes.func,
    goForward: PropTypes.func,
    length: PropTypes.number,
    listen: PropTypes.func,
    location: PropTypes.shape({
      hash: PropTypes.string,
      key: PropTypes.string,
      pathname: PropTypes.string,
      search: PropTypes.string,
      state: PropTypes.string,
    }),
    push: PropTypes.func,
    replace: PropTypes.func,
  }),
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    state: PropTypes.string,
  }),
};

export default FavoriteCities;
