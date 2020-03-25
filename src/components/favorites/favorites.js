import React from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import classNames from 'classnames';
import {AppRoute} from "../../enums";
import {getFavoriteOffers, getFavoriteCitiesSelector} from "../../reducers/favorites/selectors";
import {OfferActionCreator} from "../../actions/offer/action-creator";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import PreviewPlaces from '../preview-places/preview-places';
import FavoritesEmpty from "../favorites-empty/favorites-empty";

const PreviewPlacesWrappedHoc = withActiveItem(PreviewPlaces);

const Favorites = ({favoriteOffers, favoriteCities, history, location, getCurrentOffer}) => {
  const favoritePageEmptyClass = classNames({
    'page': true,
    'page--favorites-empty': favoriteOffers.length === 0,
  });

  const filterFavoriteOffers = (city) => {
    return favoriteOffers.filter((elem) => {
      return elem.city.name.includes(city);
    });
  };

  return (
    <div className={favoritePageEmptyClass}>

      {/* рендерит пустую страницу, если не пришло приделожений */}
      { favoriteOffers.length === 0 &&
        <FavoritesEmpty />
      }

      { favoriteOffers.length > 0 &&
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">

            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>

              <ul className="favorites__list">

                { favoriteCities &&
                  favoriteCities.map((elem) =>
                    <li key={elem} className="favorites__locations-items">

                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <a className="locations__item-link" href="#">
                            <span>{elem}</span>
                          </a>
                        </div>
                      </div>

                      <div className="favorites__places">

                        {/* рендерит превью мест */}
                        <PreviewPlacesWrappedHoc
                          // properties
                          offers={filterFavoriteOffers(elem)}
                          history={history}
                          location={location}
                          // handlers
                          getActiveItem={getCurrentOffer}
                        />

                      </div>

                    </li>
                  )}

              </ul>

            </section>

          </div>
        </main>
      }

      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.MAIN}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={64} height={33} />
        </Link>
      </footer>

    </div>
  );
};

Favorites.propTypes = {
  favoriteOffers: PropTypes.arrayOf(PropTypes.object),
  favoriteCities: PropTypes.arrayOf(PropTypes.string),
  history: PropTypes.object,
  location: PropTypes.object,
  getCurrentOffer: PropTypes.func,
};

const mapStateToProps = (state) => ({
  favoriteOffers: getFavoriteOffers(state),
  favoriteCities: getFavoriteCitiesSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentOffer: (offer) => {
    dispatch(OfferActionCreator.getCurrentOffer(offer));
  },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Favorites);
