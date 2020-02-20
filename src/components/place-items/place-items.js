import React from "react";
import PropTypes from "prop-types";

const PlaceItems = ({items}) => {
  return (
    <ul className="property__inside-list">

      { items &&
        items.map((elem, i) =>
          <PlaceItem
            // properties
            key={++i}
            elem={elem}
          />
        )
      }

    </ul>
  );
};

const PlaceItem = ({elem}) => {
  return (
    <li className="property__inside-item">
      {elem}
    </li>
  );
};

PlaceItems.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
};

PlaceItem.propTypes = {
  elem: PropTypes.string,
};

export default PlaceItems;
