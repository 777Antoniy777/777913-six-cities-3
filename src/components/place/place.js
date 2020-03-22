import React from "react";
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {AuthorizationStatus} from "../../enums";
import {OfferActionCreator} from "../../actions/offer/action-creator";
import {ReviewsAsyncActionCreator} from "../../actions/reviews/async-action-creator";
import {getOffer, getHoveredOffer} from "../../reducers/offer/selectors";
import {getInitialOffersSelector} from "../../reducers/offers/selectors";
import {getReviewsRequestStatus, getReviewsRequestMessage, getReviews} from "../../reducers/reviews/selectors";
import {getAuthorizationStatus} from "../../reducers/user/selectors";
import {ErrorReviewWrapperStyle, ErrorMessageStyle} from "../../style";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import withMap from "../../hocs/with-map/with-map";
import withLoadData from "../../hocs/with-load-data/with-load-data";
import withPlaceFormReviews from "../../hocs/with-place-form-reviews/with-place-form-reviews";
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
const PlaceReviewsWrappedHOC = withLoadData(PlaceReviews);
const PlaceFormReviewsWrappedHOC = withPlaceFormReviews(PlaceFormReviews);

const Place = ({offers, offer, hoveredOffer, reviewsRequestStatus, reviewsRequestMessage, reviews, authorizationStatus, getCurrentOffer, getReviewsOnGet, getReviewsOnPost}) => {
  const {id, title, premium, photos, price, description, type, rating, bedroomAmount, guestsAmount, items, host, location} = offer;
  const {avatar, name, status} = host;
  const splittedReviews = reviews.slice(0, 10);
  const reviewsLength = splittedReviews.length;
  let hoveredLocation = null;
  if (hoveredOffer) {
    hoveredLocation = hoveredOffer.location;
  }

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
                <PlaceReviewsWrappedHOC
                  // properties
                  offerId={id}
                  data={splittedReviews}
                  // handlers
                  getData={getReviewsOnGet}
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
                {/* { authorizationStatus === AuthorizationStatus.AUTH && */}
                <PlaceFormReviewsWrappedHOC
                  // properties
                  offerId={id}
                  // handlers
                  getReviewsOnPost={getReviewsOnPost}
                />
                {/* } */}

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
  reviewsRequestStatus: PropTypes.string,
  reviewsRequestMessage: PropTypes.string,
  reviews: PropTypes.arrayOf(PropTypes.object),
  authorizationStatus: PropTypes.string,
  getCurrentOffer: PropTypes.func,
  getReviewsOnGet: PropTypes.func,
  getReviewsOnPost: PropTypes.func,
};

const mapStateToProps = (state) => ({
  offers: getInitialOffersSelector(state),
  offer: getOffer(state),
  hoveredOffer: getHoveredOffer(state),
  reviewsRequestStatus: getReviewsRequestStatus(state),
  reviewsRequestMessage: getReviewsRequestMessage(state),
  reviews: getReviews(state),
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentOffer: (offer) => {
    dispatch(OfferActionCreator.getCurrentOffer(offer));
  },
  getReviewsOnGet: (offerId) => {
    dispatch(ReviewsAsyncActionCreator.getReviewsOnGet(offerId));
  },
  getReviewsOnPost: (offerId, comment, rating, onClearForm, onSetSubmitButtonStatus) => {
    dispatch(ReviewsAsyncActionCreator.getReviewsOnPost(offerId, comment, rating, onClearForm, onSetSubmitButtonStatus));
  },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Place);

