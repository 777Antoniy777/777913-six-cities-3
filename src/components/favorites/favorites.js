import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import classNames from "classnames";
import {AppRoute} from "../../enums";
import {ErrorMainWrapperStyle, ErrorMessageStyle} from "../../style";
import {getFavoriteCitiesSelector, getFavoriteOffers, getFavoritesRequestStatus, getFavoritesRequestMessage} from "../../reducers/favorites/selectors";
import {getUserData} from "../../reducers/user/selectors";
import Header from "../header/header";
import FavoritesEmpty from "../favorites-empty/favorites-empty";
import FavoriteCities from "../favorite-cities/favorite-cities";
import ErrorMessage from "../error-message/error-message";

const Favorites = ({favoritesRequestStatus, favoritesRequestMessage, favoriteOffers, favoriteCities, authorizationStatus, userData, history, location}) => {
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

      {/* рендерит ошибку, если сервер недоступен */}
      { favoritesRequestStatus === `error` &&
        <ErrorMessage
          // properties
          requestMessage={favoritesRequestMessage}
          wrapperStyle={ErrorMainWrapperStyle}
          messageStyle={ErrorMessageStyle}
        />
      }

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
              />

            </section>

          </div>
        </main>
      }

      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.MAIN}>
          <img className="footer__logo" src="/img/logo.svg" alt="6 cities logo" width={64} height={33} />
        </Link>
      </footer>

    </div>
  );
};

Favorites.propTypes = {
  favoritesRequestStatus: PropTypes.string,
  favoritesRequestMessage: PropTypes.string,
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
  authorizationStatus: PropTypes.string,
  userData: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
    status: PropTypes.bool,
  }),
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

const mapStateToProps = (state) => ({
  favoritesRequestStatus: getFavoritesRequestStatus(state),
  favoritesRequestMessage: getFavoritesRequestMessage(state),
  favoriteOffers: getFavoriteOffers(state),
  favoriteCities: getFavoriteCitiesSelector(state),
  userData: getUserData(state),
});

export default connect(
    mapStateToProps
)(Favorites);
