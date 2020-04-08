import React from "react";
import PropTypes from "prop-types";

type PlaceItemsProps = {
  items: string[],
};

type PlaceItemProps = {
  item: string,
};

const PlaceItems: React.FC<PlaceItemsProps> = ({items}) => {
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

const PlaceItem: React.FC<PlaceItemProps> = ({item}) => {
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
