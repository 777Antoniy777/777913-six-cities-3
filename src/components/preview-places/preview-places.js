import React from "react";
import PropTypes from "prop-types";
import PreviewPlace from "../preview-place/preview-place";

const PreviewPlaces = ({offers, onGetActiveItem}) => {
  return (
    <React.Fragment>

      { offers &&
        offers.map((elem) =>
          <PreviewPlace
            // properties
            key={elem.id}
            placeData={elem}
            // handlers
            onGetActiveItem={onGetActiveItem}
          />
        )
      }

    </React.Fragment>
  );
};

PreviewPlaces.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object),
  onGetActiveItem: PropTypes.func,
};

export default PreviewPlaces;
