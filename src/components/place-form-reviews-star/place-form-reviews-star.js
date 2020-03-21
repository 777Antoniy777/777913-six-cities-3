import React from "react";
import PropTypes from "prop-types";

const PlaceFormReviewsStar = ({star, rating, handleInputChange}) => {
  const {id, title} = star;

  return (
    <React.Fragment>
      <input id={`${id}-stars`} className="form__rating-input visually-hidden" type="radio" name="rating" value={id} checked={rating} onChange={handleInputChange} />
      <label htmlFor={`${id}-stars`} className="reviews__rating-label form__rating-label" title={title}>
        <svg className="form__star-image" width={37} height={33}>
          <use xlinkHref="#icon-star" />
        </svg>
      </label>
    </React.Fragment>
  );
};

PlaceFormReviewsStar.propTypes = {
  star: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }),
  rating: PropTypes.bool,
  handleInputChange: PropTypes.func,
};

export default PlaceFormReviewsStar;
