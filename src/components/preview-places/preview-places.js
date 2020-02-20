import React from "react";
import PropTypes from "prop-types";
import PreviewPlace from "../preview-place/preview-place";

const PreviewPlaces = ({offers, onSetPlaceData, onSetPlaceStatus}) => {
  return (
    <div className="cities__places-list places__list tabs__content">

      { offers &&
        offers.map((elem) =>
          <PreviewPlace
            // properties
            key={elem.id}
            placeData={elem}
            // handlers
            onSetPlaceData={onSetPlaceData}
            onSetPlaceStatus={onSetPlaceStatus}
          />
        )
      }

    </div>
  );
};

PreviewPlaces.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object),
  onSetPlaceData: PropTypes.func,
  onSetPlaceStatus: PropTypes.func,
};

export default PreviewPlaces;
