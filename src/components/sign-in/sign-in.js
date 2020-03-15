import React from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {UserAsyncActionCreator} from "../../actions/user/async-action-creator";

const SignIn = ({login}) => {
  const handleFormSubmit = (evt) => {
    evt.preventDefault();
  };

  const handleButtonClick = (evt) => {
    evt.preventDefault();

    login();
  };

  return (
    <div className="page page--gray page--login">

      <main className="page__main page__main--login">

        <div className="page__login-container container">

          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleFormSubmit}>

              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" required />
              </div>

              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" required />
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
  login: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  login: () => {
    dispatch(UserAsyncActionCreator.login());
  },
});

export default connect(
    null,
    mapDispatchToProps
)(SignIn);
