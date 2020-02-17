import React from "react";
import PropTypes from "prop-types";

const PreviewPlace = ({id, title, src, price, type, onSetPlaceData}) => {
  const placeData = {
    id,
    title,
    src,
    price,
    type
  };

  const handleCardMouseover = (evt) => {
    evt.preventDefault();

    onSetPlaceData(placeData);
  };

  return (
    <article className="cities__place-card place-card" onMouseOver={ handleCardMouseover }>
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={ src } width={260} height={200} alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{ price }</b>
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
            <span style={{width: `80%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{ title }</a>
        </h2>
        <p className="place-card__type">{ type }</p>
      </div>
    </article>
  );
};

PreviewPlace.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  onSetPlaceData: PropTypes.func.isRequired,
};

export default PreviewPlace;
