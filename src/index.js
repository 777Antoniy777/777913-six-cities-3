import React from 'react';
import ReactDOM from 'react-dom';
import apartments from './mocks/offers';
import App from './components/app/app';

const Options = {
  RENT_AMOUNT: 312,
};

ReactDOM.render(
    <App
      // properties
      rentAmount={ Options.RENT_AMOUNT }
      apartments={ apartments }
    />,
    document.getElementById(`root`)
);
