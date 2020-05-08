import React from "react";

type Style = {
  [key: string]: string;
};

type Props = {
  requestMessage: string;
  wrapperStyle: Style;
  messageStyle: Style;
};

const ErrorMessage: React.FC<Props> = ({requestMessage, wrapperStyle, messageStyle}: Props) => {
  return (
    <div style={wrapperStyle}>
      <p style={messageStyle}>{requestMessage}</p>
    </div>
  );
};

export default ErrorMessage;
