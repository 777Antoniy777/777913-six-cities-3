import * as React from "react";
import {AuthorizationStatus, AppRoute} from "../../enums";
import PlaceFormReviewsStar from "../place-form-reviews-star/place-form-reviews-star";
import {RouteHistory} from "../../types/history-type";

type Props = {
  offerId: number;
  authorizationStatus: string;
  review: string;
  rating: boolean[];
  submitButtonStatus: boolean;
  errors: string[];
  history: RouteHistory;
  sendReview: (offerId: number, review: string, isRating: boolean, onClearForm: () => void, onSetSubmitButtonStatus: (status: boolean) => void) => void;
  onSetSubmitButtonStatus: (status: boolean) => void;
  isCommentValid: (review: string, status: boolean) => boolean;
  isStarChoose: () => boolean;
  handleInputChange: () => void;
  onClearForm: () => void;
};

const PlaceFormReviews: React.FC<Props> = ({offerId, authorizationStatus, review, rating, submitButtonStatus, errors, history, sendReview, onSetSubmitButtonStatus, isCommentValid, isStarChoose, handleInputChange, onClearForm}: Props) => {
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

  const setButtonStyle = () => {
    const obj = {};
    const cursor = `cursor`;

    if (!submitButtonStatus) {
      obj[cursor] = `pointer`;
    } else {
      obj[cursor] = `auto`;
    }

    return obj;
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
  };

  const handleButtonClick = () => {
    const isCommentCorrect = isCommentValid(review, true);
    const isRating = isStarChoose();

    if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
      history.push(AppRoute.SIGN_IN);
      return false;
    }

    if (!isCommentCorrect) {
      return false;
    }

    if (!isRating) {
      return false;
    }

    onSetSubmitButtonStatus(true);
    sendReview(offerId, review, isRating, onClearForm, onSetSubmitButtonStatus);

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
              rating={rating[i]}
              // handlers
              handleInputChange={handleInputChange}
            />
          )}

      </div>

      <textarea id="review" className="reviews__textarea form__textarea" value={review} name="review" placeholder="Tell how was your stay, what you like and what can be improved" onChange={handleInputChange} />

      { errors.length > 0 &&
        <p style={{color: `red`}}>{errors[0]}</p>
      }

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
                          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button style={setButtonStyle()} className="reviews__submit form__submit button" type="submit" onClick={handleButtonClick} disabled={submitButtonStatus}>Submit</button>
      </div>

    </form>
  );
};

export default PlaceFormReviews;
