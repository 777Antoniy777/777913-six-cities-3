import React from "react";

type Star = {
  id: number;
  title: string;
};

type Props = {
  star: Star;
  rating: boolean;
  handleInputChange: () => void;
};

const PlaceFormReviewsStar: React.FC<Props> = ({star, rating, handleInputChange}: Props) => {
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

export default PlaceFormReviewsStar;
