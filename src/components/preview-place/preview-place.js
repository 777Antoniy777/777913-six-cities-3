import React from "react";
import PropTypes from "prop-types";
import classNames from 'classnames';

const PreviewPlace = ({placeData, isShowOffer, onSetPlaceData, onSetPlaceStatus}) => {
  const {title, premium, src, price, type, rating} = placeData;

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

  const getRating = (val) => {
    let ratingStars = Math.round(val);
    ratingStars = ratingStars * 20;

    return `${ratingStars}%`;
  };

  const handleTitleClick = (evt) => {
    evt.preventDefault();

    onSetPlaceStatus();
    onSetPlaceData(placeData);
    // window.scrollTo(0, 0);
  };

  return (
    <article className={placeWrapperClass}>

      { premium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }

      <div className={placeImageWrapperClass}>
        <a href="#">
          <img className="place-card__image" src={ src } width={260} height={200} alt="Place image" />
        </a>
      </div>

      <div className="place-card__info">

        <div className="place-card__price-wrapper">

          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>

          <button className="place-card__bookmark-button button" type="button">
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
          <a href="#">{title}</a>
        </h2>

        <p className="place-card__type">{type}</p>
      </div>

    </article>
  );
};

PreviewPlace.propTypes = {
  placeData: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    premium: PropTypes.bool,
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
  onSetPlaceData: PropTypes.func,
  onSetPlaceStatus: PropTypes.func,
};

export default PreviewPlace;
