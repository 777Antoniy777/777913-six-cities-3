import React from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames';

const PlaceHost = ({status, avatar, name, description}) => {
  const statusHostClass = classNames({
    'property__avatar-wrapper': true,
    'user__avatar-wrapper': true,
    'property__avatar-wrapper--pro': status,
  });

  return (
    <div className="property__host">
      <h2 className="property__host-title">Meet the host</h2>

      <div className="property__host-user user">
        <div className={statusHostClass}>
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
