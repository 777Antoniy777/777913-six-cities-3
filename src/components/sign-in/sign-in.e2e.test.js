import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import SignIn from "./sign-in";

const mockStore = configureStore();

Enzyme.configure({
  adapter: new Adapter(),
});

// set mocha data
const email = `email`;
const password = `password`;
const authorizationStatus = `AUTH`;
const userData = {
  id: 1,
  name: `name`,
  avatar: `avatar`,
  status: true,
};
const location = {
  pathname: `/pathname`,
};

const onInputChange = () => {};
const isFieldEmpty = () => {};
const isEmailValid = () => {};
const login = () => {};

const store = mockStore({
  user: {
    authorizationStatus: `NO_AUTH`,
    userData: null,
  }
});

describe(`SignIn should calles correct callbacks`, () => {
  it(`handler should calles only 1 time after submit the form`, () => {
    beforeEach(() => { // Runs before each test in the suite
      store.clearActions();
    });

    const preventDefault = jest.fn();

    const signIn = mount(
        <BrowserRouter>
          <Provider store={store}>
            <SignIn
              email={email}
              password={password}
              login={login}
              location={location}
              authorizationStatus={authorizationStatus}
              userData={userData}
              onInputChange={onInputChange}
            />
          </Provider>
        </BrowserRouter>
    );

    const form = signIn.find(`.login__form`);

    const mockEvent = ({
      preventDefault,
    });

    form.simulate(`submit`, mockEvent);

    expect(preventDefault).toHaveBeenCalledTimes(1);
  });
});

