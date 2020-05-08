import React from "react";

type PlacePhotosProps = {
  photos: string[];
};

type PlacePhotoProps = {
  photo: string;
};

const PlacePhotos: React.FC<PlacePhotosProps> = ({photos}: PlacePhotosProps) => {
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

const PlacePhoto: React.FC<PlacePhotoProps> = ({photo}: PlacePhotoProps) => {
  return (
    <div className="property__image-wrapper">
      <img className="property__image" src={photo} alt="Photo studio" />
    </div>
  );
};

export default PlacePhotos;
