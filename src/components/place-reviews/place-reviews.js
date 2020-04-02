import React from "react";
import PropTypes from "prop-types";
import {getRating} from "../../utils/get-rating";

const PlaceReviews = ({reviews}) => {
  return (
    <ul className="reviews__list">

      { reviews &&
        reviews.map((elem) =>
          <PlaceReview
            key={elem.id}
            review={elem}
          />
        )}

    </ul>
  );
};

const PlaceReview = ({review}) => {
  const {user, comment, rating, date} = review;
  const {name, avatar} = user;

  const getDate = (dateReview) => {
    const months = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];
    const actualDate = new Date(dateReview);
    const year = actualDate.getFullYear();
    const indexMonth = actualDate.getMonth();
    const month = months.find((elem, i) => i === indexMonth);
    const complexDate = `${month} ${year}`;

    return complexDate;
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
        <time className="reviews__time" dateTime={date}>{getDate(date)}</time>
      </div>

    </li>
  );
};

PlaceReviews.propTypes = {
  reviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        user: PropTypes.shape({
          id: PropTypes.number,
          status: PropTypes.bool,
          name: PropTypes.string,
          avatar: PropTypes.string,
        }),
        comment: PropTypes.string,
        rating: PropTypes.number,
        date: PropTypes.string,
      })
  ),
};

PlaceReview.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.shape({
      id: PropTypes.number,
      status: PropTypes.bool,
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
    comment: PropTypes.string,
    rating: PropTypes.number,
    date: PropTypes.string,
  }),
};


export default PlaceReviews;
