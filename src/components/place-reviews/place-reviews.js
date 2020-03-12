import React from "react";
import PropTypes from "prop-types";

const PlaceReviews = ({data: reviews}) => {
  const splittedReviews = reviews.slice(0, 10);
  const reviewsLength = reviews.length;

  return (
    <React.Fragment>
      { reviewsLength > 0 &&
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
      }
    </React.Fragment>
  );
};

const PlaceReview = ({review}) => {
  const {user, comment, rating, date} = review;
  const {name, avatar_url: avatar} = user;

  const getRating = (val) => {
    let ratingStars = Math.round(val);
    ratingStars = ratingStars * 20;

    return `${ratingStars}%`;
  };

  return (
    <li className="reviews__item">

      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={avatar} width={54} height={54} alt="Reviews avatar" />
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
        <time className="reviews__time" dateTime={date}>{date}</time>
      </div>

    </li>
  );
};

PlaceReviews.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

PlaceReview.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.shape({
      id: PropTypes.number,
      is_pro: PropTypes.bool,
      name: PropTypes.string,
      avatar_url: PropTypes.string,
    }),
    comment: PropTypes.string,
    rating: PropTypes.number,
    date: PropTypes.string,
  }),
};


export default PlaceReviews;
