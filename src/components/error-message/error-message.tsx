import React from "react";
import PropTypes from "prop-types";

const ErrorMessage = ({requestMessage, wrapperStyle, messageStyle}) => {
  return (
    <div style={wrapperStyle}>
      <p style={messageStyle}>{requestMessage}</p>
    </div>
  );
};

ErrorMessage.propTypes = {
  requestMessage: PropTypes.string,
  wrapperStyle: PropTypes.objectOf(PropTypes.string),
  messageStyle: PropTypes.objectOf(PropTypes.string),
};

export default ErrorMessage;
