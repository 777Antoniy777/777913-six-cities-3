import React from "react";
import PropTypes from "prop-types";

const withLoadData = (Component) => {
  class WithLoadData extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      const {offerId, onGetData} = this.props;

      onGetData(offerId);
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
    onGetData: PropTypes.func,
  };

  return WithLoadData;
};

export default withLoadData;

