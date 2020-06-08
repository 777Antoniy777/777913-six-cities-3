import * as React from "react";
import {connect} from "react-redux";
import classNames from "classnames";
import {ErrorMainWrapperStyle, ErrorMessageStyle} from "../../style";
import {getHoveredOffer} from "../../reducers/offer/selectors";
import {getCitiesSelector, getOffersRequestStatus, getOffersRequestMessage, getInitialOffers, getOffers, getCity} from "../../reducers/offers/selectors";
import {getUserData} from "../../reducers/user/selectors";
import {OffersActionCreator} from "../../actions/offers/action-creator";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import withMap from "../../hocs/with-map/with-map";
import withPlaceFilter from "../../hocs/with-place-filter/with-place-filter";
import Header from "../header/header";
import MainEmpty from "../main-empty/main-empty";
import PreviewPlaces from "../preview-places/preview-places";
import Map from "../map/map";
import Cities from "../cities/cities";
import PlaceFilter from "../place-filter/place-filter";
import ErrorMessage from "../error-message/error-message";
import {Offer} from "../../types/main-types/offers-type";
import {Offers} from "../../types/main-types/offers-type";
import {User} from "../../types/main-types/user-type";
import {RouteHistory} from "../../types/main-types/history-type";
import {RouteLocation} from "../../types/main-types/location-type";

type Props = {
  hoveredOffer: Offer;
  offersRequestStatus: string;
  offersRequestMessage: string;
  offers: Offers;
  initialOffers: Offers;
  filteredOffers: Offers;
  currentCity: string;
  cities: string[];
  authorizationStatus: string;
  userData: User;
  history: RouteHistory;
  location: RouteLocation;
  getCurrentCity: () => void;
  setDefaultOrderOffers: () => void;
  setLowToHighOrderOffers: () => void;
  setHighToLowOrderOffers: () => void;
  setTopRatedFirstOrderOffers: () => void;
};

const CitiesWrappedHoc = withActiveItem(Cities);
const MapWrappedHoc = withMap(Map);
const PlaceFilterWrappedHoc = withPlaceFilter(PlaceFilter);

const Main: React.FC<Props> = ({hoveredOffer, offersRequestStatus, offersRequestMessage, offers, initialOffers, filteredOffers, currentCity, cities, authorizationStatus, userData, history, location, getCurrentCity, setDefaultOrderOffers, setLowToHighOrderOffers, setHighToLowOrderOffers, setTopRatedFirstOrderOffers}: Props) => {
  const mainEmptyClass = classNames({
    'page__main': true,
    'page__main--index': true,
    'page__main--index-empty': filteredOffers.length === 0,
  });

  let hoveredLocation = null;
  if (hoveredOffer) {
    hoveredLocation = hoveredOffer.location;
  }

  return (
    <div className="page page--gray page--main">

      {/* Хедер приложения */}
      <Header
        // properties
        authorizationStatus={authorizationStatus}
        userData={userData}
        location={location}
      />

      <main className={mainEmptyClass}>
        <h1 className="visually-hidden">Cities</h1>

        <div className="tabs">
          <section className="locations container">

            {/* рендерит список городов */}
            { cities.length > 0 &&
              <CitiesWrappedHoc
                // properties
                cities={cities}
                currentCity={currentCity}
                // handlers
                getActiveItem={getCurrentCity}
              />
            }

          </section>
        </div>

        <div className="cities">

          { offersRequestStatus === `error` &&
            <ErrorMessage
              // properties
              requestMessage={offersRequestMessage}
              wrapperStyle={ErrorMainWrapperStyle}
              messageStyle={ErrorMessageStyle}
            />
          }

          {/* рендерит пустую страницу, если не пришло приделожений */}
          { filteredOffers.length === 0 &&
            <MainEmpty />
          }

          { filteredOffers.length > 0 &&
            <div className="cities__places-container container">

              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{filteredOffers.length} places to stay in {currentCity}</b>

                {/* рендерит блок фильтра */}
                <PlaceFilterWrappedHoc
                  // properties
                  initialOffers={initialOffers}
                  offers={offers}
                  // handlers
                  setDefaultOrderOffers={setDefaultOrderOffers}
                  setLowToHighOrderOffers={setLowToHighOrderOffers}
                  setHighToLowOrderOffers={setHighToLowOrderOffers}
                  setTopRatedFirstOrderOffers={setTopRatedFirstOrderOffers}
                />

                <div className="cities__places-list places__list tabs__content">

                  {/* рендерит превью мест */}
                  <PreviewPlaces
                    // properties
                    offers={filteredOffers}
                    history={history}
                    location={location}
                  />

                </div>

              </section>

              <div className="cities__right-section">
                <section className="cities__map map">

                  {/* карта с маркерами */}
                  { filteredOffers.length > 0 &&
                    <MapWrappedHoc
                      // properties
                      offers={filteredOffers}
                      hoveredLocation={hoveredLocation}
                    />
                  }

                </section>
              </div>

            </div>
          }

        </div>
      </main>
    </div>
  );
};

const mapStateToProps = (state) => ({
  hoveredOffer: getHoveredOffer(state),
  offersRequestStatus: getOffersRequestStatus(state),
  offersRequestMessage: getOffersRequestMessage(state),
  currentCity: getCity(state),
  cities: getCitiesSelector(state),
  userData: getUserData(state),
  initialOffers: getInitialOffers(state),
  offers: getOffers(state),
  filteredOffers: state.offers.offers.filter((elem) => {
    return elem.city.name.includes(state.offers.city);
  }),
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentCity: (city) => {
    dispatch(OffersActionCreator.getCurrentCity(city));
  },
  setDefaultOrderOffers: (offers) => {
    dispatch(OffersActionCreator.setDefaultOrderOffers(offers));
  },
  setLowToHighOrderOffers: (offers) => {
    dispatch(OffersActionCreator.setLowToHighOrderOffers(offers));
  },
  setHighToLowOrderOffers: (offers) => {
    dispatch(OffersActionCreator.setHighToLowOrderOffers(offers));
  },
  setTopRatedFirstOrderOffers: (offers) => {
    dispatch(OffersActionCreator.setTopRatedFirstOrderOffers(offers));
  },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);

