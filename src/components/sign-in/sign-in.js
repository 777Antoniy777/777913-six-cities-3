import React from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {getUserData} from "../../reducers/user/selectors";
import {UserAsyncActionCreator} from "../../actions/user/async-action-creator";
import Header from "../header/header";

const SignIn = ({email, password, login, location, authorizationStatus, userData, onInputChange, isFieldEmpty, isEmailValid}) => {
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
  email: PropTypes.string,
  password: PropTypes.string,
  onInputChange: PropTypes.func,
  isFieldEmpty: PropTypes.func,
  isEmailValid: PropTypes.func,
  login: PropTypes.func,
  location: PropTypes.object,
  authorizationStatus: PropTypes.string,
  userData: PropTypes.object,
};

const mapStateToProps = (state) => ({
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
