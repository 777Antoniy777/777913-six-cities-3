import React from "react";
import PropTypes from "prop-types";

type PlacePhotosProps = {
  photos: string[],
};

type PlacePhotoProps = {
  photo: string,
};

const PlacePhotos: React.FC<PlacePhotosProps> = ({photos}) => {
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

const PlacePhoto: React.FC<PlacePhotoProps> = ({photo}) => {
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
