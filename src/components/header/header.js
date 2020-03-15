import React from 'react';
import PropTypes from "prop-types";
import {AuthorizationStatus} from "../../enums";

const Header = ({authorizationStatus, userData}) => {
  const isUserLogin = () => {
    if (authorizationStatus && authorizationStatus === AuthorizationStatus.AUTH && userData) {
      const {email} = userData;

      return (
        <React.Fragment>
          <div className="header__avatar-wrapper user__avatar-wrapper"></div>
          <span className="header__user-name user__name">{email}</span>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="header__avatar-wrapper user__avatar-wrapper">
          </div>
          <span className="header__login">Sign in</span>
        </React.Fragment>
      );
    }
  };

  return (
    <header className="header">
      <div className="container">

        <div className="header__wrapper">

          <div className="header__left">
            <a className="header__logo-link" href="main.html">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} />
            </a>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <a className="header__nav-link header__nav-link--profile" href="#">

                  {/* рендерит анонимного, либо зарегестрированного пользователя*/}
                  {isUserLogin()}

                </a>
              </li>
            </ul>
          </nav>

        </div>

      </div>
    </header>
  );
};

Header.propTypes = {
  authorizationStatus: PropTypes.string,
  userData: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
    status: PropTypes.bool,
  }),
};

export default Header;
