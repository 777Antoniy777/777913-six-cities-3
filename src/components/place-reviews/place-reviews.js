import React from "react";
import PropTypes from "prop-types";

const PlaceReviews = ({data: reviews}) => {
  const splittedReviews = reviews.slice(0, 10);
  const reviewsLength = reviews.length;
  // const reviewsLength = 1;

  return (
    <React.Fragment>
      <h2 className="reviews__title">Reviews · <span className="reviews__amount">{reviewsLength}</span></h2>

      <ul className="reviews__list">

        {splittedReviews.map((elem) =>
          <PlaceReview
            key={elem.id}
            review={elem}
          />
        )}

      </ul>
    </React.Fragment>
  );
};

const PlaceReview = ({review}) => {
  const {user, comment, rating, date} = review;
  const {name} = user;

  const getRating = (val) => {
    let ratingStars = Math.round(val);
    ratingStars = ratingStars * 20;

    return `${ratingStars}%`;
  };

  return (
    <li className="reviews__item">

      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src="img/avatar-max.jpg" width={54} height={54} alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">{name}</span>
      </div>

      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${getRating(rating)}`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        {/* после получения данных с сервера заменить datetime */}
        <time className="reviews__time" dateTime="2019-04-24">{date}</time>
      </div>

    </li>
  );
};

PlaceReviews.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.object),
};

PlaceReview.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.number,
    body: PropTypes.string,
    rating: PropTypes.number,
    name: PropTypes.string,
    date: PropTypes.string,
  }),
};


export default PlaceReviews;
