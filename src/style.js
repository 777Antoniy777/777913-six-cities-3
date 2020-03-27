const ErrorMainWrapperStyle = {
  position: `fixed`,
  top: `50%`,
  left: `50%`,
  zIndex: `10`,
  display: `flex`,
  justifyContent: `center`,
  alignItems: `center`,
  width: `300px`,
  height: `200px`,
  padding: `20px`,
  textAlign: `center`,
  backgroundColor: `lightblue`,
  borderRadius: `5px`,
  transform: `translate(-50%, -50%)`,
  boxSizing: `border-box`,
};

const ErrorReviewWrapperStyle = {
  display: `flex`,
  justifyContent: `center`,
  alignItems: `center`,
  textAlign: `center`,
  boxSizing: `border-box`,
};

const ErrorMessageStyle = {
  textTransform: `uppercase`,
  color: `red`,
};

const ImageBigStyle = {
  width: 260,
  height: 200,
};

const ImageSmallStyle = {
  width: 150,
  height: 110,
};

const MainLinkStyle = {
  'cursor': `pointer`,
};

const AnotherLinkStyle = {
  'cursor': `auto`,
};

export {ErrorMainWrapperStyle, ErrorReviewWrapperStyle, ErrorMessageStyle, ImageBigStyle, ImageSmallStyle, MainLinkStyle, AnotherLinkStyle};
