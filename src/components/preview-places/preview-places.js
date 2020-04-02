import React from "react";
import PropTypes from "prop-types";
import PreviewPlace from "../preview-place/preview-place";

const PreviewPlaces = ({offers, history, location}) => {
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

PreviewPlaces.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        city: PropTypes.shape({
          name: PropTypes.string,
          location: PropTypes.shape({
            latitude: PropTypes.number,
            longitude: PropTypes.number,
            zoom: PropTypes.number,
          }),
        }),
        title: PropTypes.string,
        premium: PropTypes.bool,
        favorite: PropTypes.bool,
        src: PropTypes.string,
        photos: PropTypes.arrayOf(PropTypes.string),
        price: PropTypes.number,
        description: PropTypes.string,
        type: PropTypes.string,
        rating: PropTypes.number,
        bedroomAmount: PropTypes.number,
        guestsAmount: PropTypes.number,
        items: PropTypes.arrayOf(PropTypes.string),
        host: PropTypes.shape({
          avatar: PropTypes.string,
          id: PropTypes.number,
          name: PropTypes.string,
          status: PropTypes.bool,
        }),
      })
  ),
  history: PropTypes.shape({
    action: PropTypes.string,
    block: PropTypes.func,
    createHref: PropTypes.func,
    go: PropTypes.func,
    goBack: PropTypes.func,
    goForward: PropTypes.func,
    length: PropTypes.number,
    listen: PropTypes.func,
    location: PropTypes.shape({
      hash: PropTypes.string,
      key: PropTypes.string,
      pathname: PropTypes.string,
      search: PropTypes.string,
      state: PropTypes.string,
    }),
    push: PropTypes.func,
    replace: PropTypes.func,
  }),
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    state: PropTypes.string,
  }),
};

export default PreviewPlaces;
