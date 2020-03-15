import React from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import classNames from 'classnames';
import {OffersActionCreator} from "../../actions/offers/action-creator";
import {OfferActionCreator} from "../../actions/offer/action-creator";
import {getOffersSelector, getCitiesSelector, getRequestStatus, getRequestMessage, getInitialOffers, getOffers, getCity} from "../../reducers/offers/selectors";
import {ErrorMainWrapperStyle, ErrorMessageStyle} from "../../style";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import withMap from "../../hocs/with-map/with-map";
import withPlaceFilter from "../../hocs/with-place-filter/with-place-filter";
import MainEmpty from "../main-empty/main-empty";
import PreviewPlaces from '../preview-places/preview-places';
import Map from '../map/map';
import Cities from '../cities/cities';
import PlaceFilter from '../place-filter/place-filter';
import ErrorMessage from "../error-message/error-message";
const CitiesWrappedHoc = withActiveItem(Cities);
const PreviewPlacesWrappedHoc = withActiveItem(PreviewPlaces);
const MapWrappedHoc = withMap(Map);
const PlaceFilterWrappedHoc = withPlaceFilter(PlaceFilter);

const Main = ({requestStatus, requestMessage, offers, initialOffers, filteredOffers, currentCity, cities, getCurrentCity, getCurrentOffer, setDefaultOrderOffers, setLowToHighOrderOffers, setHighToLowOrderOffers, setTopRatedFirstOrderOffers}) => {

  const mainEmptyClass = classNames({
    'page__main': true,
    'page__main--index': true,
    'page__main--index-empty': offers.length === 0,
  });

  return (
    <div className="page page--gray page--main">

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

          { requestStatus === `error` &&
            <ErrorMessage
              // properties
              requestMessage={requestMessage}
              wrapperStyle={ErrorMainWrapperStyle}
              messageStyle={ErrorMessageStyle}
            />
          }

          { offers.length === 0 &&
            <MainEmpty />
          }

          { offers.length > 0 &&
            <div className="cities__places-container container">

              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offers.length} places to stay in {currentCity}</b>

                {/* рендерит блок фильтра */}
                <PlaceFilterWrappedHoc
                  // properties
                  initialOffers={initialOffers}
                  offers={filteredOffers}
                  // handlers
                  setDefaultOrderOffers={setDefaultOrderOffers}
                  setLowToHighOrderOffers={setLowToHighOrderOffers}
                  setHighToLowOrderOffers={setHighToLowOrderOffers}
                  setTopRatedFirstOrderOffers={setTopRatedFirstOrderOffers}
                />

                <div className="cities__places-list places__list tabs__content">

                  {/* рендерит превью мест */}
                  <PreviewPlacesWrappedHoc
                    // properties
                    offers={offers}
                    // handlers
                    getActiveItem={getCurrentOffer}
                  />

                </div>

              </section>

              <div className="cities__right-section">
                <section className="cities__map map">

                  {/* карта с маркерами */}
                  { offers.length > 0 &&
                    <MapWrappedHoc
                      // properties
                      offers={offers}
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

Main.propTypes = {
  requestStatus: PropTypes.string,
  requestMessage: PropTypes.string,
  offers: PropTypes.arrayOf(PropTypes.object),
  initialOffers: PropTypes.arrayOf(PropTypes.object),
  filteredOffers: PropTypes.arrayOf(PropTypes.object),
  currentCity: PropTypes.string,
  cities: PropTypes.arrayOf(PropTypes.string),
  getCurrentCity: PropTypes.func,
  getCurrentOffer: PropTypes.func,
  setDefaultOrderOffers: PropTypes.func,
  setLowToHighOrderOffers: PropTypes.func,
  setHighToLowOrderOffers: PropTypes.func,
  setTopRatedFirstOrderOffers: PropTypes.func,
};

const mapStateToProps = (state) => ({
  requestStatus: getRequestStatus(state),
  requestMessage: getRequestMessage(state),
  currentCity: getCity(state),
  cities: getCitiesSelector(state),
  initialOffers: getInitialOffers(state),
  filteredOffers: getOffers(state),
  offers: state.offers.offers.filter((elem) => {
    return elem.city.name.includes(state.offers.city);
  }),
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentCity: (city) => {
    dispatch(OffersActionCreator.getCurrentCity(city));
  },
  getCurrentOffer: (offer) => {
    dispatch(OfferActionCreator.getCurrentOffer(offer));
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

