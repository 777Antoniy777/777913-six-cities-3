import * as React from "react";
import PreviewPlaces from "../preview-places/preview-places";
import {Offers} from "../../types/offers-type";
import {RouteHistory} from "../../types/history-type";
import {RouteLocation} from "../../types/location-type";

type FavoriteCitiesProps = {
  favoriteOffers: Offers;
  favoriteCities: string[];
  history: RouteHistory;
  location: RouteLocation;
};

type FavoriteCityProps = {
  favoriteOffers: Offers;
  favoriteCity: string;
  history: RouteHistory;
  location: RouteLocation;
};

const FavoriteCities: React.FC<FavoriteCitiesProps> = ({favoriteOffers, favoriteCities, history, location}: FavoriteCitiesProps) => {
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

const FavoriteCity: React.FC<FavoriteCityProps> = ({favoriteOffers, favoriteCity, history, location}: FavoriteCityProps) => {
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

export default FavoriteCities;
