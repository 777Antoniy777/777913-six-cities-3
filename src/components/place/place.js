import React from "react";
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import classNames from 'classnames';
import {AuthorizationStatus, AppRoute} from "../../enums";
import {OfferActionCreator} from "../../actions/offer/action-creator";
import {ReviewsAsyncActionCreator} from "../../actions/reviews/async-action-creator";
import {FavoritesAsyncActionCreator} from "../../actions/favorites/async-action-creator";
import {getOffer, getHoveredOffer} from "../../reducers/offer/selectors";
import {getInitialOffersSelector, getMapOffersSelector, getNearbyOffers} from "../../reducers/offers/selectors";
import {getReviewsRequestStatus, getReviewsRequestMessage, getReviewsSelector} from "../../reducers/reviews/selectors";
import {getUserData} from "../../reducers/user/selectors";
import {ErrorReviewWrapperStyle, ErrorMessageStyle} from "../../style";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import withMap from "../../hocs/with-map/with-map";
import withPlaceFormReviews from "../../hocs/with-place-form-reviews/with-place-form-reviews";
import Header from "../header/header";
import PlacePhotos from "../place-photos/place-photos";
import PlaceItems from "../place-items/place-items";
import PlaceHost from "../place-host/place-host";
import PlaceReviews from "../place-reviews/place-reviews";
import PreviewPlaces from "../preview-places/preview-places";
import Map from "../map/map";
import PlaceFormReviews from "../place-form-reviews/place-form-reviews";
import ErrorMessage from "../error-message/error-message";

const PreviewPlacesWrappedHOC = withActiveItem(PreviewPlaces);
const MapWrappedHOC = withMap(Map);
const PlaceFormReviewsWrappedHOC = withPlaceFormReviews(PlaceFormReviews);

const Place = ({offers, offer, hoveredOffer, reviewsRequestStatus, reviewsRequestMessage, reviews, authorizationStatus, userData, history, location: routeLocation, nearbyOffers, mapOffers, getCurrentOffer, sendReview, setFavoriteStatus}) => {
  const {id, title, premium, favorite, photos, price, description, type, rating, bedroomAmount, guestsAmount, items, host, location} = offer;
  const {avatar, name, status} = host;
  const splittedReviews = reviews.slice(0, 10);
  const reviewsLength = splittedReviews.length;
  let hoveredLocation = null;
  if (hoveredOffer) {
    hoveredLocation = hoveredOffer.location;
  }

  const favoriteButtonClass = classNames({
    'button': true,
    'property__bookmark-button': true,
    'property__bookmark-button--active': favorite,
  });

  const getRating = (val) => {
    let ratingStars = Math.round(val);
    ratingStars = ratingStars * 20;

    return `${ratingStars}%`;
  };

  const handleFavoriteButtonClick = (evt) => {
    evt.preventDefault();

    if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
      history.push(AppRoute.SIGN_IN);
      return false;
    }

    setFavoriteStatus(id, +!favorite);

    return true;
  };

  return (
    <div className="page">

      {/* Хедер приложения */}
      <Header
        // properties
        authorizationStatus={authorizationStatus}
        userData={userData}
        location={routeLocation}
      />

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

                <button className={favoriteButtonClass} type="button" onClick={handleFavoriteButtonClick}>
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
                <PlaceReviews
                  // properties
                  reviews={splittedReviews}
                />

                {/* рендерит ошибку, если сервер недоступен */}
                { reviewsRequestStatus === `error` &&
                  <ErrorMessage
                    // properties
                    requestMessage={reviewsRequestMessage}
                    wrapperStyle={ErrorReviewWrapperStyle}
                    messageStyle={ErrorMessageStyle}
                  />
                }

                {/* рендерит форму отзывов */}
                { authorizationStatus === AuthorizationStatus.AUTH &&
                  <PlaceFormReviewsWrappedHOC
                    // properties
                    offerId={id}
                    authorizationStatus={authorizationStatus}
                    history={history}
                    // handlers
                    sendReview={sendReview}
                  />
                }

              </section>

            </div>
          </div>

          <section className="property__map map">

            {/* карта с маркерами */}
            { offers.length > 0 &&
              <MapWrappedHOC
                // properties
                offers={mapOffers}
                activelocation={location}
                hoveredLocation={hoveredLocation}
              />
            }

          </section>
        </section>

        { nearbyOffers.length > 0 &&
          <div className="container">

            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>

              <div className="near-places__list places__list">

                {/* рендерит превью мест */}
                <PreviewPlacesWrappedHOC
                  // properties
                  offers={nearbyOffers}
                  location={routeLocation}
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
  reviewsRequestStatus: PropTypes.string,
  reviewsRequestMessage: PropTypes.string,
  reviews: PropTypes.arrayOf(PropTypes.object),
  authorizationStatus: PropTypes.string,
  userData: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  nearbyOffers: PropTypes.arrayOf(PropTypes.object),
  mapOffers: PropTypes.arrayOf(PropTypes.object),
  getCurrentOffer: PropTypes.func,
  sendReview: PropTypes.func,
  setFavoriteStatus: PropTypes.func,
};

const mapStateToProps = (state) => ({
  offers: getInitialOffersSelector(state),
  offer: getOffer(state),
  hoveredOffer: getHoveredOffer(state),
  reviewsRequestStatus: getReviewsRequestStatus(state),
  reviewsRequestMessage: getReviewsRequestMessage(state),
  reviews: getReviewsSelector(state),
  userData: getUserData(state),
  nearbyOffers: getNearbyOffers(state),
  mapOffers: getMapOffersSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentOffer: (offer) => {
    dispatch(OfferActionCreator.getCurrentOffer(offer));
  },
  sendReview: (offerId, comment, rating, onClearForm, onSetSubmitButtonStatus) => {
    dispatch(ReviewsAsyncActionCreator.sendReview(offerId, comment, rating, onClearForm, onSetSubmitButtonStatus));
  },
  setFavoriteStatus: (hotelId, status) => {
    dispatch(FavoritesAsyncActionCreator.setFavoriteStatus(hotelId, status));
  },
});

export {Place};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Place);

