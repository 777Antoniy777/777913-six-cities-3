import * as React from "react";
import PreviewPlace from "../preview-place/preview-place";
import {Offers} from "../../types/offers-type";
import {RouteHistory} from "../../types/history-type";
import {RouteLocation} from "../../types/location-type";

type Props = {
  offers: Offers;
  history: RouteHistory;
  location: RouteLocation;
};

const PreviewPlaces: React.FC<Props> = ({offers, history, location}: Props) => {
  return (
    <React.Fragment>

      { offers &&
        offers.map((elem) =>
          <PreviewPlace
            // properties
            key={elem.id}
            placeData={elem}
            history={history}
            location={location}
          />
        )
      }

    </React.Fragment>
  );
};

export default PreviewPlaces;
