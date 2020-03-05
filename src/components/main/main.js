import React from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import classNames from 'classnames';
import ActionCreator from '../../actions/action-creator';
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import withMap from "../../hocs/with-map/with-map";
import PreviewPlaces from '../preview-places/preview-places';
import Map from '../map/map';
import Cities from '../cities/cities';
import PlaceFilter from '../place-filter/place-filter';

const CitiesWrappedHoc = withActiveItem(Cities);
const PreviewPlacesWrappedHoc = withActiveItem(PreviewPlaces);
const MapWrapperHoc = withMap(Map);

const Main = ({offers, currentCity, getCities, onGetCurrentCity, onGetCurrentOffer}) => {
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
                onGetCurrentCity={onGetCurrentCity}
              />
            }

          </section>
        </div>

        <div className="cities">

          { offers.length === 0 &&
            <div className="cities__places-container cities__places-container--empty container">

              <section className="cities__no-places">

                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">We could not find any property availbale at the moment in Dusseldorf</p>
                </div>

              </section>

              <div className="cities__right-section" />

            </div>
          }

          { offers.length > 0 &&
            <div className="cities__places-container container">

              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offers.length} places to stay in {currentCity}</b>

                {/* рендерит блок фильтра */}
                <PlaceFilter />

                <div className="cities__places-list places__list tabs__content">

                  {/* рендерит превью мест */}
                  <PreviewPlacesWrappedHoc
                    // properties
                    offers={offers}
                    // handlers
                    onGetCurrentOffer={onGetCurrentOffer}
                  />

                </div>

              </section>

              <div className="cities__right-section">
                <section className="cities__map map">

                  {/* карта с маркерами */}
                  { offers.length > 0 &&
                    // <Map
                    //   // properties
                    //   offers={offers}
                    // />
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
  offers: PropTypes.arrayOf(PropTypes.object),
  currentCity: PropTypes.string,
  getCities: PropTypes.func,
  onGetCurrentCity: PropTypes.func,
};

const mapStateToProps = (state) => ({
  currentCity: state.offers.city,
  getCities: () => {
    let set = new Set();

    state.offers.initialOffers.forEach((elem) => {
      const city = elem.city;
      set.add(city);
    });

    const cities = Array.from(set);
    const splittedCities = cities.slice(0, 6);

    return splittedCities;
  },
  offers: state.offers.offers.filter((elem) => {
    return elem.city.includes(state.offers.city);
  }),
});

const mapDispatchToProps = (dispatch) => ({
  // onGetActiveItem: (item) => {
  //   dispatch(ActionCreator.getActiveItemAction(item));
  //   // dispatch(ActionCreator.getCurrentOfferAction(city));
  // }

  onGetCurrentCity: (city) => {
    dispatch(ActionCreator.getCurrentCityAction(city));
  },
  onGetCurrentOffer: (offer) => {
    dispatch(ActionCreator.getCurrentOfferAction(offer));
  },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);

