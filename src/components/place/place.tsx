import * as React from "react";
import {connect} from "react-redux";
import classNames from "classnames";
import {AuthorizationStatus, AppRoute} from "../../enums";
import {ErrorReviewWrapperStyle, ErrorMessageStyle} from "../../style";
import {getHoveredOffer} from "../../reducers/offer/selectors";
import {getOffersRequestStatus, getOffersRequestMessage, getNearbyOffers} from "../../reducers/offers/selectors";
import {getReviewsRequestStatus, getReviewsRequestMessage, getReviewsSelector} from "../../reducers/reviews/selectors";
import {getUserData} from "../../reducers/user/selectors";
import {getFavoritesRequestStatus, getFavoritesRequestMessage} from "../../reducers/favorites/selectors";
import {ReviewsAsyncActionCreator} from "../../actions/reviews/async-action-creator";
import {FavoritesAsyncActionCreator} from "../../actions/favorites/async-action-creator";
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
import {getRating} from "../../utils/get-rating";
import {Offer} from "../../types/offers-type";
import {Offers} from "../../types/offers-type";
import {Reviews} from "../../types/reviews-type";
import {User} from "../../types/user-type";
import {RouteHistory} from "../../types/history-type";
import {RouteLocation} from "../../types/location-type";

type Props = {
  offer: Offer;
  hoveredOffer: Offer;
  reviewsRequestStatus: string;
  reviewsRequestMessage: string;
  offersRequestStatus: string;
  offersRequestMessage: string;
  favoritesRequestStatus: string;
  favoritesRequestMessage: string;
  reviews: Reviews;
  authorizationStatus: string;
  userData: User;
  history: RouteHistory;
  location: RouteLocation;
  nearbyOffers: Offers;
  sendReview: () => void;
  setFavoriteStatus: (hotelId: number, status: number) => void;
};

const MapWrappedHOC = withMap(Map);
const PlaceFormReviewsWrappedHOC = withPlaceFormReviews(PlaceFormReviews);

const Place: React.FC<Props> = ({offer, hoveredOffer, reviewsRequestStatus, reviewsRequestMessage, offersRequestStatus, offersRequestMessage, favoritesRequestStatus, favoritesRequestMessage, reviews, authorizationStatus, userData, history, location: routeLocation, nearbyOffers, sendReview, setFavoriteStatus}: Props) => {

  if (!offer) {
    return null;
  }

  const {id, title, premium, favorite, photos, price, description, type, rating, bedroomAmount, guestsAmount, items, host, location} = offer;
  const {avatar, name, status} = host;

  const mapOffers = nearbyOffers.slice();
  mapOffers.push(offer);

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

              {/* рендерит ошибку, если сервер недоступен */}
              { favoritesRequestStatus === `error` &&
                <ErrorMessage
                  // properties
                  requestMessage={favoritesRequestMessage}
                  wrapperStyle={ErrorReviewWrapperStyle}
                  messageStyle={ErrorMessageStyle}
                />
              }

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
            { mapOffers.length > 0 &&
              <MapWrappedHOC
                // properties
                offers={mapOffers}
                activelocation={location}
                hoveredLocation={hoveredLocation}
              />
            }

          </section>
        </section>

        {/* рендерит ошибку, если сервер недоступен */}
        { offersRequestStatus === `error` &&
          <ErrorMessage
            // properties
            requestMessage={offersRequestMessage}
            wrapperStyle={ErrorReviewWrapperStyle}
            messageStyle={ErrorMessageStyle}
          />
        }

        { nearbyOffers.length > 0 &&
          <div className="container">

            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>

              <div className="near-places__list places__list">

                {/* рендерит превью мест */}
                <PreviewPlaces
                  // properties
                  offers={nearbyOffers}
                  location={routeLocation}
                  history={history}
                />

              </div>

            </section>

          </div>
        }

      </main>

    </div>
  );
};

const mapStateToProps = (state) => ({
  hoveredOffer: getHoveredOffer(state),
  offersRequestStatus: getOffersRequestStatus(state),
  offersRequestMessage: getOffersRequestMessage(state),
  reviewsRequestStatus: getReviewsRequestStatus(state),
  reviewsRequestMessage: getReviewsRequestMessage(state),
  favoritesRequestStatus: getFavoritesRequestStatus(state),
  favoritesRequestMessage: getFavoritesRequestMessage(state),
  reviews: getReviewsSelector(state),
  userData: getUserData(state),
  nearbyOffers: getNearbyOffers(state),
});

const mapDispatchToProps = (dispatch) => ({
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

