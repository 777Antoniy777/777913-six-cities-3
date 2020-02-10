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

App.defaultProps = {
  rentAmount: 0,
};

App.propTypes = {
  rentAmount: PropTypes.number.isRequired,
  apartments: PropTypes.arrayOf(
      PropTypes.exact({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
      })
  ),
};

export default App;
