import React from "react";
import PropTypes from "prop-types";

const Map = ({map}) => {
  return (
    <div id="map" style={{height: `100%`}} ref={map}></div>
  );
};

Map.propTypes = {
  map: PropTypes.shape({
    current: PropTypes.object,
  }),
};

export default Map;
