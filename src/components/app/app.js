import React from 'react';
import PropTypes from "prop-types";
import Main from '../main/main';

const App = (props) => {
  return (
    <Main
      rentAmount={ props.rentAmount }
      apartments={ props.apartments }
    />
  );
};

App.propTypes = {
  rentAmount: PropTypes.number.isRequired,
  apartments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default App;
