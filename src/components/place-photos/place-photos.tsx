import React from "react";
import PropTypes from "prop-types";

const PlacePhotos = ({photos}) => {
  return (
    <div className="property__gallery">

      { photos &&
        photos.map((elem, i) =>
          <PlacePhoto
            // properties
            key={++i}
            photo={elem}
          />
        )
      }

    </div>
  );
};

const PlacePhoto = ({photo}) => {
  return (
    <div className="property__image-wrapper">
      <img className="property__image" src={photo} alt="Photo studio" />
    </div>
  );
};

PlacePhotos.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.string),
};

PlacePhoto.propTypes = {
  photo: PropTypes.string,
};

export default PlacePhotos;
