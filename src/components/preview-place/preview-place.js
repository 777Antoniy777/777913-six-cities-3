import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import classNames from 'classnames';
import {AuthorizationStatus, AppRoute} from "../../enums";
import {ImageBigStyle, ImageSmallStyle} from "../../style";
import {OfferActionCreator} from '../../actions/offer/action-creator';
import {FavoritesAsyncActionCreator} from "../../actions/favorites/async-action-creator";
import {getAuthorizationStatus} from "../../reducers/user/selectors";

const PreviewPlace = ({placeData, authorizationStatus, history, location, getActiveItem, getHoveredOffer, removeHoveredOffer, setFavoriteStatus}) => {
  const {id, title, premium, favorite, src, price, type, rating} = placeData;
  let imageStyle = ImageBigStyle;
  let pathname;

  if (location) {
    pathname = location.pathname;
  }

  if (pathname === `/favorites`) {
    imageStyle = ImageSmallStyle;
  }

  const placeWrapperClass = classNames({
    'place-card': true,
    'cities__place-card': pathname === `/`,
    'near-places__card': pathname.startsWith(`/offer`),
    'favorites__card': pathname === `/favorites`,
  });

  const placeImageWrapperClass = classNames({
    'place-card__image-wrapper': true,
    'cities__image-wrapper': pathname === `/`,
    'near-places__image-wrapper': pathname.startsWith(`/offer`),
    'favorites__image-wrapper': pathname === `/favorites`,
  });

  const placeInfoWrapperClass = classNames({
    'place-card__info': true,
    'favorites__card-info': pathname === `/favorites`,
  });

  const favoriteButtonClass = classNames({
    'button': true,
    'place-card__bookmark-button': true,
    'place-card__bookmark-button--active': favorite,
  });

  const getRating = (val) => {
    let ratingStars = Math.round(val);
    ratingStars = ratingStars * 20;

    return `${ratingStars}%`;
  };

  const handleTitleClick = (evt) => {
    evt.preventDefault();

    getActiveItem(placeData);
    window.scrollTo(0, 0);
  };

  const handleCardMouseenter = () => {
    getHoveredOffer(placeData);
  };

  const handleCardMouseleave = () => {
    removeHoveredOffer(null);
  };

  const handleFavoriteButtonClick = (evt) => {
    evt.preventDefault();

    if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
      history.push(AppRoute.SIGN_IN);
      return false;
    }

    setFavoriteStatus(id, +!favorite);

    return true;
  };

  return (
    <article className={placeWrapperClass} onMouseEnter={handleCardMouseenter} onMouseLeave={handleCardMouseleave}>

      { premium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }

      <div className={placeImageWrapperClass}>
        <a href="#">
          <img className="place-card__image" style={imageStyle} src={src} alt={title} />
        </a>
      </div>

      <div className={placeInfoWrapperClass}>

        <div className="place-card__price-wrapper">

          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>

          <button className={favoriteButtonClass} type="button" onClick={handleFavoriteButtonClick}>
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>

        </div>

        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${getRating(rating)}`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>

        <h2 className="place-card__name" onClick={handleTitleClick}>
          <Link to={AppRoute.OFFER(id)}>{title}</Link>
        </h2>

        <p className="place-card__type">{type}</p>
      </div>

    </article>
  );
};

PreviewPlace.propTypes = {
  placeData: PropTypes.shape({
    id: PropTypes.number,
    city: PropTypes.object,
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
    host: PropTypes.object,
  }),
  authorizationStatus: PropTypes.string,
  history: PropTypes.object,
  location: PropTypes.object,
  getActiveItem: PropTypes.func,
  removeHoveredOffer: PropTypes.func,
  getHoveredOffer: PropTypes.func,
  setFavoriteStatus: PropTypes.func,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  getHoveredOffer: (offer) => {
    dispatch(OfferActionCreator.getHoveredOffer(offer));
  },
  removeHoveredOffer: (offer) => {
    dispatch(OfferActionCreator.removeHoveredOffer(offer));
  },
  setFavoriteStatus: (hotelId, status) => {
    dispatch(FavoritesAsyncActionCreator.setFavoriteStatus(hotelId, status));
  },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PreviewPlace);
