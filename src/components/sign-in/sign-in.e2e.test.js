import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
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

const onInputChange = () => {};

const store = mockStore({});

describe(`SignIn should calles correct callbacks`, () => {
  it(`handler should calles only 1 time after submit the form`, () => {
    beforeEach(() => { // Runs before each test in the suite
      store.clearActions();
    });

    const preventDefault = jest.fn();

    const signIn = mount(
        <Provider store={store}>
          <SignIn
            email={email}
            password={password}
            onInputChange={onInputChange}
          />
        </Provider>
    );

    const form = signIn.find(`.login__form`);

    const mockEvent = ({
      preventDefault,
    });

    form.simulate(`submit`, mockEvent);

    expect(preventDefault).toHaveBeenCalledTimes(1);
  });
});

