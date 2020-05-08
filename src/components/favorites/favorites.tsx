import React from "react";
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

type Props = {
  favoritesRequestStatus: string;
  favoritesRequestMessage: string;
  favoriteOffers: Offers;
  favoriteCities: string[];
  authorizationStatus: string;
  userData: User;
  history: RouteHistory;
  location: RouteLocation;
};

const Favorites: React.FC<Props> = ({favoritesRequestStatus, favoritesRequestMessage, favoriteOffers, favoriteCities, authorizationStatus, userData, history, location}: Props) => {
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
