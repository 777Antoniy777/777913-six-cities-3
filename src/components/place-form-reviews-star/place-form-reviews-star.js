import React from "react";
import PropTypes from "prop-types";

const PlaceFormReviewsStar = ({star, radioButton}) => {
  const {id, title} = star;

  return (
    <React.Fragment>
      <input ref={radioButton} className="form__rating-input visually-hidden" name="rating" defaultValue={id} id={`${id}-stars`} type="radio" />
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
  radioButton: PropTypes.object,
};

export default PlaceFormReviewsStar;
