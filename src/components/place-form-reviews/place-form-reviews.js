import React from "react";
import PropTypes from "prop-types";
import PlaceFormReviewsStar from "../place-form-reviews-star/place-form-reviews-star";

const PlaceFormReviews = ({offerId, textarea, radioButtonRefs, getReviewsOnPost}) => {
  const starTitles = [
    {
      id: 5,
      title: `perfect`,
    },
    {
      id: 4,
      title: `good`,
    },
    {
      id: 3,
      title: `not bad`,
    },
    {
      id: 2,
      title: `badly`,
    },
    {
      id: 1,
      title: `terribly`,
    },
  ];

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
  };

  const handleButtonClick = () => {
    const textareaTarget = textarea.current;
    const textareaValue = textareaTarget.value;

    const radioButton = radioButtonRefs.find((elem) => {
      return elem.current.checked === true;
    });

    const rating = radioButton.current.value;

    getReviewsOnPost(offerId, textareaValue, rating);

    return true;
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <div className="reviews__rating-form form__rating">

        { starTitles &&
          starTitles.map((elem, i) =>
            <PlaceFormReviewsStar
              // properties
              key={elem.id}
              star={elem}
              radioButton={radioButtonRefs[i]}
            />
          )}

      </div>

      <textarea ref={textarea} className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" defaultValue={``} />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
                          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" onClick={handleButtonClick}>Submit</button>
      </div>

    </form>
  );
};

PlaceFormReviews.propTypes = {
  offerId: PropTypes.number,
  textarea: PropTypes.object,
  radioButton: PropTypes.object,
  getReviewsOnPost: PropTypes.func,
};

export default PlaceFormReviews;
