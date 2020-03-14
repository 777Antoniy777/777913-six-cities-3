import React from "react";
import PropTypes from "prop-types";

const withLoadData = (Component) => {
  class WithLoadData extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      const {offerId, getData} = this.props;

      // getData(offerId);
    }

    render() {
      const {data} = this.props;

      return (
        <Component
          {...this.props}
          data={data}
        />
      );
    }
  }

  WithLoadData.propTypes = {
    offerId: PropTypes.number,
    data: PropTypes.arrayOf(PropTypes.object),
    getData: PropTypes.func,
  };

  return WithLoadData;
};

export default withLoadData;

