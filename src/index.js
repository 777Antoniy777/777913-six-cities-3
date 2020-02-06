import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const Options = {
  RENT_AMOUNT: 312,
};

ReactDOM.render(
    <App
      rentAmount={ Options.RENT_AMOUNT }
    />,
    document.getElementById(`root`)
);
