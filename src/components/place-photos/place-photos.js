import React from "react";
import PropTypes from "prop-types";

const PlacePhoto = ({elem}) => {
  return (
    <div className="property__image-wrapper">
      <img className="property__image" src={elem} alt="Photo studio" />
    </div>
  );
};

const PlacePhotos = ({photos}) => {
  return (
    <div className="property__gallery">

      { photos &&
        photos.map((elem, i) =>
          <PlacePhoto
            // properties
            key={++i}
            elem={elem}
          />
        )
      }

    </div>
  );
};

PlacePhotos.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.string),
};

PlacePhoto.propTypes = {
  elem: PropTypes.string,
};

export default PlacePhotos;
