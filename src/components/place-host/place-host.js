import React from 'react';
import PropTypes from "prop-types";

const PlaceHost = ({status, avatar, name, description}) => {
  const isStatusHost = (val) => {
    return val ? `property__avatar-wrapper--pro` : ``;
  };

  const statusHost = isStatusHost(status);

  return (
    <div className="property__host">
      <h2 className="property__host-title">Meet the host</h2>

      <div className="property__host-user user">
        <div className={`property__avatar-wrapper ${statusHost} user__avatar-wrapper`}>
          <img className="property__avatar user__avatar" src={avatar} width={74} height={74} alt="Host avatar" />
        </div>
        <span className="property__user-name">
          {name}
        </span>
      </div>

      <div className="property__description">
        <p className="property__text">
          {description}
        </p>
        {/* <p className="property__text">
            An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
        </p> */}
      </div>

    </div>
  );
};

PlaceHost.propTypes = {
  status: PropTypes.bool,
  avatar: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
};

export default PlaceHost;
