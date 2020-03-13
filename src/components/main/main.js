import React from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import classNames from 'classnames';
import {OffersActionCreator} from "../../actions/offers/action-creator";
import {OfferActionCreator} from "../../actions/offer/action-creator";
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
const MapWrapperHoc = withMap(Map);
const PlaceFilterWrapperHoc = withPlaceFilter(PlaceFilter);

const Main = ({requestStatus, requestMessage, offers, initialOffers, filteredOffers, currentCity, getCities, getCurrentCity, getCurrentOffer, setDefaultOrderOffers, setLowToHighOrderOffers, setHighToLowOrderOffers, setTopRatedFirstOrderOffers}) => {
  const cities = getCities();

  const mainEmptyClass = classNames({
    'page__main': true,
    'page__main--index': true,
    'page__main--index-empty': offers.length === 0,
  });

  return (
    <div className="page page--gray page--main">

      <header className="header">
        <div className="container">

          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
              </ul>
            </nav>

          </div>

        </div>
      </header>

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
                <PlaceFilterWrapperHoc
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
                    <MapWrapperHoc
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
  getCities: PropTypes.func,
  getCurrentCity: PropTypes.func,
  getCurrentOffer: PropTypes.func,
  setDefaultOrderOffers: PropTypes.func,
  setLowToHighOrderOffers: PropTypes.func,
  setHighToLowOrderOffers: PropTypes.func,
  setTopRatedFirstOrderOffers: PropTypes.func,
};

const mapStateToProps = (state) => ({
  requestStatus: state.offers.requestStatus,
  requestMessage: state.offers.requestMessage,
  currentCity: state.offers.city,
  getCities: () => {
    let set = new Set();

    state.offers.initialOffers.forEach((elem) => {
      const city = elem.city.name;
      set.add(city);
    });

    const cities = Array.from(set);
    const splittedCities = cities.slice(0, 6);

    return splittedCities;
  },
  initialOffers: state.offers.initialOffers,
  filteredOffers: state.offers.offers,
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

