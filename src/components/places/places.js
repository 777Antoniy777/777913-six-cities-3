import React from "react";
import PropTypes from "prop-types";
import Place from "../place/place";

class Places extends React.PureComponent {
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
    const {apartments} = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">

        { apartments &&
          apartments.map((elem) =>
            <Place
              // properties
              key={ elem.id }
              id={ elem.id }
              title={ elem.title }
              src={ elem.src }
              price={ elem.price }
              type={ elem.type }
              // handlers
              setPlaceData={ this.onSetPlaceData }
            />
          )
        }

      </div>
    );
  }
}

Places.propTypes = {
  apartments: PropTypes.arrayOf(
      PropTypes.exact({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
      })
  ),
};

export default Places;
