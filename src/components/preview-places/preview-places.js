import React from "react";
import PropTypes from "prop-types";
import PreviewPlace from "../preview-place/preview-place";

const PreviewPlaces = ({offers}) => {
  return (
    <React.Fragment>

      { offers &&
        offers.map((elem) =>
          <PreviewPlace
            // properties
            key={elem.id}
            placeData={elem}
          />
        )
      }

    </React.Fragment>
  );
};

PreviewPlaces.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object),
};

export default PreviewPlaces;
