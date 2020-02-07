import React from 'react';
import PropTypes from "prop-types";
import Main from '../main/main';

const App = ({rentAmount, apartments}) => {
  return (
    <Main
      rentAmount={ rentAmount }
      apartments={ apartments }
    />
  );
};

App.propTypes = {
  rentAmount: PropTypes.number.isRequired,
  apartments: PropTypes.arrayof(
      PropTypes.number,
      PropTypes.string
  ).isRequired,
};

export default App;
