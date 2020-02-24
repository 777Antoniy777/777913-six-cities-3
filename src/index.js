import React from 'react';
import ReactDOM from 'react-dom';
import offers from './mocks/offers';
import App from './components/app/app';

ReactDOM.render(
    <App
      // properties
      offers={offers}
    />,
    document.getElementById(`root`)
);
