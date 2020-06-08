import * as React from "react";

type PlaceItemsProps = {
  items: string[];
};

type PlaceItemProps = {
  item: string;
};

const PlaceItems: React.FC<PlaceItemsProps> = ({items}: PlaceItemsProps) => {
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

const PlaceItem: React.FC<PlaceItemProps> = ({item}: PlaceItemProps) => {
  return (
    <li className="property__inside-item">
      {item}
    </li>
  );
};

export default PlaceItems;
