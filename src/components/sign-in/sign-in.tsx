import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ErrorReviewWrapperStyle, ErrorMessageStyle} from "../../style";
import {getUserData} from "../../reducers/user/selectors";
import {getUserRequestStatus, getUserRequestMessage} from "../../reducers/user/selectors";
import {UserAsyncActionCreator} from "../../actions/user/async-action-creator";
import Header from "../header/header";
import ErrorMessage from "../error-message/error-message";

const SignIn = ({email, password, login, location, userRequestStatus, userRequestMessage, authorizationStatus, userData, onInputChange, isFieldEmpty, isEmailValid}) => {
  const handleFormSubmit = (evt) => {
    evt.preventDefault();
  };

  const handleButtonClick = () => {
    const isEmailEmpty = isFieldEmpty(email);
    const isPasswordEmpty = isFieldEmpty(password);
    const isEmailCorrect = isEmailValid(email);

    if (!isEmailEmpty || !isPasswordEmpty) {
      return false;
    }

    if (!isEmailCorrect) {
      return false;
    }

    login(email, password);
    return true;
  };

  return (
    <div className="page page--gray page--login">

      {/* Хедер приложения */}
      <Header
        // properties
        authorizationStatus={authorizationStatus}
        userData={userData}
        location={location}
      />

      <main className="page__main page__main--login">

        <div className="page__login-container container">

          <section className="login">
            <h1 className="login__title">Sign in</h1>

            <form className="login__form form" action="#" method="post" onSubmit={handleFormSubmit}>

              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" value={email} placeholder="Email" onChange={onInputChange} required />
              </div>

              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" value={password} placeholder="Password" onChange={onInputChange} required />
              </div>

              {/* рендерит ошибку, если сервер недоступен */}
              { userRequestStatus === `error` &&
                <ErrorMessage
                  // properties
                  requestMessage={userRequestMessage}
                  wrapperStyle={ErrorReviewWrapperStyle}
                  messageStyle={ErrorMessageStyle}
                />
              }

              <button className="login__submit form__submit button" type="submit" onClick={handleButtonClick}>Sign in</button>
            </form>

          </section>

          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>

        </div>

      </main>
    </div>
  );
};

SignIn.propTypes = {
  userRequestStatus: PropTypes.string,
  userRequestMessage: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    state: PropTypes.string,
  }),
  authorizationStatus: PropTypes.string,
  userData: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
    status: PropTypes.bool,
  }),
  login: PropTypes.func,
  onInputChange: PropTypes.func,
  isFieldEmpty: PropTypes.func,
  isEmailValid: PropTypes.func,
};

const mapStateToProps = (state) => ({
  userRequestStatus: getUserRequestStatus(state),
  userRequestMessage: getUserRequestMessage(state),
  userData: getUserData(state),
});

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => {
    dispatch(UserAsyncActionCreator.login(email, password));
  },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn);