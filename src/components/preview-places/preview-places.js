import React from "react";
import PropTypes from "prop-types";
import PreviewPlace from "../preview-place/preview-place";

class PreviewPlaces extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      placeData: null,
    };
    this.onSetPlaceData = this.onSetPlaceData.bind(this);
  }

  onSetPlaceData(obj) {
    this.setState({
      placeData: obj,
    });
  }

  render() {
    const {offers} = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">

        { offers &&
          offers.map((elem) =>
            <PreviewPlace
              // properties
              key={ elem.id }
              id={ elem.id }
              title={ elem.title }
              src={ elem.src }
              price={ elem.price }
              type={ elem.type }
              // handlers
              onSetPlaceData={ this.onSetPlaceData }
            />
          )
        }

      </div>
    );
  }
}

PreviewPlaces.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.object.isRequired
  ).isRequired,
};

export default PreviewPlaces;
