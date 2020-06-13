import * as React from "react";
import {Link} from "react-router-dom";
import {AuthorizationStatus, AppRoute} from "../../enums";
import {MainLinkStyle, AnotherLinkStyle} from "../../style";
import {User} from "../../types/user-type";
import {RouteLocation} from "../../types/location-type";

type Props = {
  authorizationStatus: string;
  userData: User;
  location: RouteLocation;
};

const Header: React.FC<Props> = ({authorizationStatus, userData, location}: Props) => {
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

export default Header;
