import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {AuthorizationStatus, AppRoute} from "../../enums";
import {MainLinkStyle, AnotherLinkStyle} from "../../style";

const Header = ({authorizationStatus, userData, location}) => {
  let linkStyle = MainLinkStyle;

  if (location.pathname === AppRoute.MAIN) {
    linkStyle = AnotherLinkStyle;
  }

  return (
    <header className="header">
      <div className="container">

        <div className="header__wrapper">

          <div className="header__left">
            <Link className="header__logo-link" style={linkStyle} to={AppRoute.MAIN}>
              <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width={81} height={41} />
            </Link>
          </div>

          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">

                {/* рендерит анонимного, либо зарегестрированного пользователя*/}
                { authorizationStatus === AuthorizationStatus.AUTH && userData
                  ?
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.FAVORITES}>
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">{userData.email}</span>
                  </Link>
                  :
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.SIGN_IN}>
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__login">Sign in</span>
                  </Link>
                }

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
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    state: PropTypes.string,
  }),
};

export default Header;
