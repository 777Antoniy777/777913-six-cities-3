import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import classNames from 'classnames';
import {AuthorizationStatus, AppRoute} from "../../enums";
import {OfferActionCreator} from '../../actions/offer/action-creator';
import {FavoritesAsyncActionCreator} from "../../actions/favorites/async-action-creator";
import {getShowOfferStatus} from "../../reducers/offer/selectors";
import {getAuthorizationStatus} from "../../reducers/user/selectors";

const PreviewPlace = ({placeData, isShowOffer, authorizationStatus, history, getActiveItem, getHoveredOffer, removeHoveredOffer, setOfferStatus, setFavoriteStatus}) => {
  const {id, title, premium, favorite, src, price, type, rating} = placeData;

  const placeWrapperClass = classNames({
    'place-card': true,
    'cities__place-card': !isShowOffer,
    'near-places__card': isShowOffer,
  });

  const placeImageWrapperClass = classNames({
    'place-card__image-wrapper': true,
    'cities__image-wrapper': !isShowOffer,
    'near-places__image-wrapper': isShowOffer,
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
    setOfferStatus(true);
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
          <img className="place-card__image" src={src} width={260} height={200} alt="Place image" />
        </a>
      </div>

      <div className="place-card__info">

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
  isShowOffer: PropTypes.bool,
  getActiveItem: PropTypes.func,
  setOfferStatus: PropTypes.func,
  removeHoveredOffer: PropTypes.func,
  getHoveredOffer: PropTypes.func,
};

// может убрать isShowOffer?
const mapStateToProps = (state) => ({
  isShowOffer: getShowOfferStatus(state),
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  getHoveredOffer: (offer) => {
    dispatch(OfferActionCreator.getHoveredOffer(offer));
  },
  removeHoveredOffer: (offer) => {
    dispatch(OfferActionCreator.removeHoveredOffer(offer));
  },
  setOfferStatus: (status) => {
    dispatch(OfferActionCreator.setOfferStatus(status));
  },
  setFavoriteStatus: (hotelId, status) => {
    dispatch(FavoritesAsyncActionCreator.setFavoriteStatus(hotelId, status));
  },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PreviewPlace);
