import React from "react";
import PropTypes from "prop-types";
import PreviewPlace from "../preview-place/preview-place";

const PreviewPlaces = ({offers, isShowOffer, onSetPlaceData, onSetIndexPlaceData, onSetPlaceStatus}) => {
  return (
    <React.Fragment>

      { offers &&
        offers.map((elem, i) =>
          <PreviewPlace
            // properties
            key={elem.id}
            index={i}
            placeData={elem}
            isShowOffer={isShowOffer}
            // handlers
            onSetPlaceData={onSetPlaceData}
            onSetIndexPlaceData={onSetIndexPlaceData}
            onSetPlaceStatus={onSetPlaceStatus}
          />
        )
      }

    </React.Fragment>
  );
};

PreviewPlaces.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object),
  isShowOffer: PropTypes.bool,
  onSetPlaceData: PropTypes.func,
  onSetPlaceStatus: PropTypes.func,
};

export default PreviewPlaces;
