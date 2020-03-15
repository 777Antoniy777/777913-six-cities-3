import React from "react";
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {OfferActionCreator} from "../../actions/offer/action-creator";
// import {ReviewsAsyncActionCreator} from "../../actions/reviews/async-action-creator";
import {getOffer, getHoveredOffer} from "../../reducers/offer/selectors";
import {getInitialOffersSelector} from "../../reducers/offers/selectors";
import {getRequestStatus, getRequestMessage, getReviews} from "../../reducers/reviews/selectors";
import {ErrorReviewWrapperStyle, ErrorMessageStyle} from "../../style";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import withMap from "../../hocs/with-map/with-map";
import withLoadData from "../../hocs/with-load-data/with-load-data";
import PlacePhotos from "../place-photos/place-photos";
import PlaceItems from "../place-items/place-items";
import PlaceHost from "../place-host/place-host";
import PlaceReviews from "../place-reviews/place-reviews";
import PreviewPlaces from "../preview-places/preview-places";
import Map from "../map/map";
import ErrorMessage from "../error-message/error-message";

const PreviewPlacesWrappedHOC = withActiveItem(PreviewPlaces);
const MapWrappedHOC = withMap(Map);
const PlaceReviewsWrappedHOC = withLoadData(PlaceReviews);

// getReviews
const Place = ({offers, offer, hoveredOffer, requestStatus, requestMessage, reviews, getCurrentOffer}) => {
  const {id, title, premium, photos, price, description, type, rating, bedroomAmount, guestsAmount, items, host, location} = offer;
  const {avatar, name, status} = host;
  const splittedReviews = reviews.slice(0, 10);
  const reviewsLength = splittedReviews.length;
  let hoveredLocation = null;
  if (hoveredOffer) {
    hoveredLocation = hoveredOffer.location;
  }

  const renderPlaceReviews = () => {
    if (requestStatus === `error`) {
      return (
        <ErrorMessage
          // properties
          requestMessage={requestMessage}
          wrapperStyle={ErrorReviewWrapperStyle}
          messageStyle={ErrorMessageStyle}
        />
      );
    } else {
      return (
        <PlaceReviewsWrappedHOC
          // properties
          offerId={id}
          data={splittedReviews}
          // handlers
          // getData={getReviews}
        />
      );
    }
  };

  const getRating = (val) => {
    let ratingStars = Math.round(val);
    ratingStars = ratingStars * 20;

    return `${ratingStars}%`;
  };

  const splitOffers = () => {
    const filteredOffers = offers.filter((elem) => {
      return elem.id !== offer.id;
    });
    return filteredOffers.slice(0, 3);
  };

  const extendedOffersForMap = splitOffers();
  const extendedOffersForPreviews = splitOffers();
  extendedOffersForMap.push(offer);

  return (
    <div className="page">

      <main className="page__main page__main--property">

        <section className="property">

          <div className="property__gallery-container container">

            {/* рендерит все фото места */}
            <PlacePhotos
              // properties
              photos={photos}
            />

          </div>

          <div className="property__container container">
            <div className="property__wrapper">

              { premium &&
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              }

              <div className="property__name-wrapper">

                <h1 className="property__name">
                  {title}
                </h1>

                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>

              </div>

              <div className="property__rating rating">

                <div className="property__stars rating__stars">
                  <span style={{width: `${getRating(rating)}`}} />
                  <span className="visually-hidden">Rating</span>
                </div>

                <span className="property__rating-value rating__value">{rating}</span>
              </div>

              <ul className="property__features">

                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedroomAmount} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                    Max {guestsAmount} adults
                </li>

              </ul>

              <div className="property__price">
                <b className="property__price-value">€{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>

              <div className="property__inside">
                <h2 className="property__inside-title">What&rsquo;s inside</h2>

                {/* рендерит наполнение комнаты */}
                <PlaceItems
                  // properties
                  items={items}
                />

              </div>

              {/* рендерит блок о хосте */}
              <PlaceHost
                // properties
                status={status}
                avatar={avatar}
                name={name}
                description={description}
              />

              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews · <span className="reviews__amount">{reviewsLength}</span></h2>

                {/* рендерит отзывы пользователей */}
                {renderPlaceReviews()}

                <form className="reviews__form form" action="#" method="post">
                  <label className="reviews__label form__label" htmlFor="review">Your review</label>

                  <div className="reviews__rating-form form__rating">

                    <input className="form__rating-input visually-hidden" name="rating" defaultValue={5} id="5-stars" type="radio" />
                    <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
                      <svg className="form__star-image" width={37} height={33}>
                        <use xlinkHref="#icon-star" />
                      </svg>
                    </label>

                    <input className="form__rating-input visually-hidden" name="rating" defaultValue={4} id="4-stars" type="radio" />
                    <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
                      <svg className="form__star-image" width={37} height={33}>
                        <use xlinkHref="#icon-star" />
                      </svg>
                    </label>

                    <input className="form__rating-input visually-hidden" name="rating" defaultValue={3} id="3-stars" type="radio" />
                    <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
                      <svg className="form__star-image" width={37} height={33}>
                        <use xlinkHref="#icon-star" />
                      </svg>
                    </label>

                    <input className="form__rating-input visually-hidden" name="rating" defaultValue={2} id="2-stars" type="radio" />
                    <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
                      <svg className="form__star-image" width={37} height={33}>
                        <use xlinkHref="#icon-star" />
                      </svg>
                    </label>

                    <input className="form__rating-input visually-hidden" name="rating" defaultValue={1} id="1-star" type="radio" />
                    <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
                      <svg className="form__star-image" width={37} height={33}>
                        <use xlinkHref="#icon-star" />
                      </svg>
                    </label>

                  </div>

                  <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" defaultValue={``} />

                  <div className="reviews__button-wrapper">
                    <p className="reviews__help">
                        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
                    </p>
                    <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
                  </div>

                </form>
              </section>

            </div>
          </div>

          <section className="property__map map">

            {/* карта с маркерами */}
            { offers.length > 0 &&
              <MapWrappedHOC
                // properties
                offers={extendedOffersForMap}
                activelocation={location}
                hoveredLocation={hoveredLocation}
              />
            }

          </section>
        </section>

        { extendedOffersForPreviews.length > 0 &&

          <div className="container">

            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>

              <div className="near-places__list places__list">

                {/* рендерит превью мест */}
                <PreviewPlacesWrappedHOC
                  // properties
                  offers={extendedOffersForPreviews}
                  // handlers
                  getActiveItem={getCurrentOffer}
                />

              </div>

            </section>

          </div>

        }

      </main>

    </div>
  );
};

Place.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object),
  offer: PropTypes.shape({
    id: PropTypes.number,
    city: PropTypes.object,
    title: PropTypes.string,
    premium: PropTypes.bool,
    favorite: PropTypes.bool,
    src: PropTypes.string,
    photos: PropTypes.arrayOf(PropTypes.string),
    price: PropTypes.number,
    description: PropTypes.string,
    type: PropTypes.string,
    rating: PropTypes.number,
    bedroomAmount: PropTypes.number,
    guestsAmount: PropTypes.number,
    items: PropTypes.arrayOf(PropTypes.string),
    host: PropTypes.object,
    location: PropTypes.objectOf(PropTypes.number),
  }),
  hoveredOffer: PropTypes.shape({
    id: PropTypes.number,
    city: PropTypes.object,
    title: PropTypes.string,
    premium: PropTypes.bool,
    favorite: PropTypes.bool,
    src: PropTypes.string,
    photos: PropTypes.arrayOf(PropTypes.string),
    price: PropTypes.number,
    description: PropTypes.string,
    type: PropTypes.string,
    rating: PropTypes.number,
    bedroomAmount: PropTypes.number,
    guestsAmount: PropTypes.number,
    items: PropTypes.arrayOf(PropTypes.string),
    host: PropTypes.object,
    location: PropTypes.objectOf(PropTypes.number),
  }),
  requestStatus: PropTypes.string,
  requestMessage: PropTypes.string,
  reviews: PropTypes.arrayOf(PropTypes.object),
  getCurrentOffer: PropTypes.func,
  getReviews: PropTypes.func,
};

const mapStateToProps = (state) => ({
  offers: getInitialOffersSelector(state),
  offer: getOffer(state),
  hoveredOffer: getHoveredOffer(state),
  requestStatus: getRequestStatus(state),
  requestMessage: getRequestMessage(state),
  reviews: getReviews(state),
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentOffer: (offer) => {
    dispatch(OfferActionCreator.getCurrentOffer(offer));
  },
  // getReviews: (offerId) => {
  //   dispatch(ReviewsAsyncActionCreator.getReviews(offerId));
  // },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Place);

