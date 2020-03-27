import React from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import classNames from 'classnames';
import {AppRoute} from "../../enums";
import {getFavoriteOffers, getFavoriteCitiesSelector} from "../../reducers/favorites/selectors";
import {getUserData} from "../../reducers/user/selectors";
import {OfferActionCreator} from "../../actions/offer/action-creator";
import Header from "../header/header";
import FavoritesEmpty from "../favorites-empty/favorites-empty";
import FavoriteCities from "../favorite-cities/favorite-cities";

const Favorites = ({favoriteOffers, favoriteCities, authorizationStatus, userData, history, location, getCurrentOffer}) => {
  const favoritePageEmptyClass = classNames({
    'page': true,
    'page--favorites-empty': favoriteOffers.length === 0,
  });

  return (
    <div className={favoritePageEmptyClass}>

      {/* Хедер приложения */}
      <Header
        // properties
        authorizationStatus={authorizationStatus}
        userData={userData}
        location={location}
      />

      {/* рендерит пустую страницу, если не пришло предложений */}
      { favoriteOffers.length === 0 &&
        <FavoritesEmpty />
      }

      { favoriteOffers.length > 0 &&
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">

            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>

              {/* рендерит список избранных городов */}
              <FavoriteCities
                // properties
                favoriteOffers={favoriteOffers}
                favoriteCities={favoriteCities}
                history={history}
                location={location}
                // handlers
                getCurrentOffer={getCurrentOffer}
              />

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
  authorizationStatus: PropTypes.string,
  userData: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  getCurrentOffer: PropTypes.func,
};

const mapStateToProps = (state) => ({
  favoriteOffers: getFavoriteOffers(state),
  favoriteCities: getFavoriteCitiesSelector(state),
  userData: getUserData(state),
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