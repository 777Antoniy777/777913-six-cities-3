import React from 'react';
import ReactDOM from 'react-dom';
import offers from './mocks/offers';
import App from './components/app/app';

const Options = {
  RENT_AMOUNT: 312,
};

ReactDOM.render(
    <App
      // properties
      rentAmount={ Options.RENT_AMOUNT }
      offers={ offers }
    />,
    document.getElementById(`root`)
);
