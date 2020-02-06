import React from 'react';
import Main from '../main/main';

const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {rentAmount} = props;

  return (
    <Main
      rentAmount={ rentAmount }
    />
  );
};

export default App;
