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
            item={elem}
          />
        )
      }

    </ul>
  );
};

const PlaceItem = ({item}) => {
  return (
    <li className="property__inside-item">
      {item}
    </li>
  );
};

PlaceItems.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
};

PlaceItem.propTypes = {
  item: PropTypes.string,
};

export default PlaceItems;
