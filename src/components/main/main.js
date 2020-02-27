import React from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import PreviewPlaces from '../preview-places/preview-places';
import Map from '../map/map';
import Cities from '../cities/cities';
import changeCityAction from '../../actions/changeCityAction';

const Main = ({offers, currentCity, getCities, onGetCity}) => {
  const cities = getCities();

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

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <div className="tabs">
          <section className="locations container">

            {/* рендерит список городов */}
            { cities.length > 0 &&
              <Cities
                // properties
                cities={cities}
                currentCity={currentCity}
                // handlers
                onGetCity={onGetCity}
              />
            }

          </section>
        </div>

        <div className="cities">
          <div className="cities__places-container container">

            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in {currentCity}</b>

              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>

                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width={7} height={4}>
                    <use xlinkHref="#icon-arrow-select" />
                  </svg>
                </span>

                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>

                {/*
              <select class="places__sorting-type" id="places-sorting">
                <option class="places__option" value="popular" selected="">Popular</option>
                <option class="places__option" value="to-high">Price: low to high</option>
                <option class="places__option" value="to-low">Price: high to low</option>
                <option class="places__option" value="top-rated">Top rated first</option>
              </select>
              */}
              </form>

              <div className="cities__places-list places__list tabs__content">

                {/* рендерит превью мест */}
                <PreviewPlaces
                  // properties
                  offers={offers}
                />

              </div>

            </section>

            <div className="cities__right-section">
              <section className="cities__map map">

                {/* карта с маркерами */}
                { offers.length > 0 &&
                  <Map
                    // properties
                    offers={offers}
                  />
                }

              </section>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

Main.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object),
  currentCity: PropTypes.string,
  getCities: PropTypes.func,
  onGetCity: PropTypes.func,
};

const mapStateToProps = (state) => ({
  currentCity: state.offers.city,
  getCities: () => {
    let set = new Set();

    state.offers.offers.forEach((elem) => {
      const city = elem.city;
      set.add(city);
    });

    const cities = Array.from(set);
    const splittedCities = cities.slice(0, 6);

    return splittedCities;
  },
  offers: state.offers.offers.filter((elem) => {
    return elem.city === state.offers.city;
  }),
});

const mapDispatchToProps = (dispatch) => ({
  onGetCity: (city) => {
    dispatch(changeCityAction(city));
  }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);

