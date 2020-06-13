import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import SignIn from "./sign-in";
import {User} from "../../types/user-type";
import {RouteLocation} from "../../types/location-type";

const mockStore = configureStore();

configure({adapter: new Adapter()});

// set mocha data
const email = `email`;
const password = `password`;
const authorizationStatus = `AUTH`;
const userData: User = {
  id: 1,
  email: `email`,
  name: `name`,
  avatar: `avatar`,
  status: true,
};
const location: RouteLocation = {
  hash: `hash`,
  key: `key`,
  pathname: `/pathname`,
  search: `search`,
  state: `state`,
};

const store = mockStore({
  user: {
    authorizationStatus: `NO_AUTH`,
    userData: null,
  }
});

describe(`SignIn should calles correct callbacks`, () => {
  it(`function should be called only 1 times after submit the form`, () => {
    const preventDefault = jest.fn();

    const signIn = mount(
        <BrowserRouter>
          <Provider store={store}>
            <SignIn
              email={email}
              password={password}
              login={() => null}
              location={location}
              authorizationStatus={authorizationStatus}
              userData={userData}
              onInputChange={() => null}
              isFieldEmpty={() => null}
              isEmailValid={() => null}
            />
          </Provider>
        </BrowserRouter>
    );

    const form = signIn.find(`.login__form`);

    const mockEvent = {
      preventDefault,
    };

    form.simulate(`submit`, mockEvent);

    expect(preventDefault).toHaveBeenCalledTimes(1);
  });

  it(`function should be called 2 time after click on the submit button and it should set "email" in first time and "password" in second time in arg `, () => {
    const isEmailEmpty = jest.fn();

    const signIn = mount(
        <BrowserRouter>
          <Provider store={store}>
            <SignIn
              email={email}
              password={password}
              login={() => null}
              location={location}
              authorizationStatus={authorizationStatus}
              userData={userData}
              onInputChange={() => null}
              isFieldEmpty={isEmailEmpty}
              isEmailValid={() => null}
            />
          </Provider>
        </BrowserRouter>
    );

    const submitButton = signIn.find(`.login__submit`);

    const mockEvent = {};

    submitButton.simulate(`click`, mockEvent);

    expect(isEmailEmpty).toHaveBeenCalledTimes(2);
    expect(isEmailEmpty.mock.calls[0][0]).toBe(email);
    expect(isEmailEmpty.mock.calls[1][0]).toBe(password);
  });

  it(`function should be called 1 time after click on the submit button and it should set "email" in arg `, () => {
    const isEmailValid = jest.fn();

    const signIn = mount(
        <BrowserRouter>
          <Provider store={store}>
            <SignIn
              email={email}
              password={password}
              login={() => null}
              location={location}
              authorizationStatus={authorizationStatus}
              userData={userData}
              onInputChange={() => null}
              isFieldEmpty={() => null}
              isEmailValid={isEmailValid}
            />
          </Provider>
        </BrowserRouter>
    );

    const submitButton = signIn.find(`.login__submit`);

    const mockEvent = {};

    submitButton.simulate(`click`, mockEvent);

    expect(isEmailValid).toHaveBeenCalledTimes(1);
    expect(isEmailValid.mock.calls[0][0]).toBe(email);
  });
});

