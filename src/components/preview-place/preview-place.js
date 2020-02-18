import React from "react";
import PropTypes from "prop-types";

const PreviewPlace = ({elem: placeData, onSetPlaceData, onSetPlaceStatus}) => {
  const {title, premium, src, price, type, rating} = placeData;

  const getRating = (val) => {
    let ratingStars = Math.round(val);
    ratingStars = ratingStars * 20;

    return `${ratingStars}%`;
  };

  const handleCardMouseover = (evt) => {
    evt.preventDefault();

    onSetPlaceData(placeData);
  };

  const handleTitleClick = (evt) => {
    evt.preventDefault();

    onSetPlaceStatus();
  };

  return (
    <article className="cities__place-card place-card" onMouseOver={handleCardMouseover}>

      { premium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }

      <div className="cities__image-wrapper place-card__image-wrapper">
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
  elem: PropTypes.exact({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    premium: PropTypes.bool.isRequired,
    src: PropTypes.string.isRequired,
    photos: PropTypes.arrayOf(
        PropTypes.string.isRequired
    ).isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    bedroomAmount: PropTypes.number.isRequired,
    guestsAmount: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.string.isRequired
    ).isRequired,
    host: PropTypes.object.isRequired,
  }),
  onSetPlaceData: PropTypes.func.isRequired,
  onSetPlaceStatus: PropTypes.func.isRequired,
};

export default PreviewPlace;
