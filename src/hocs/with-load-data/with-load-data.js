import React from "react";
import PropTypes from "prop-types";

const withLoadData = (Component) => {
  class WithLoadData extends React.Component {

    componentDidMount() {
      const {getData} = this.props;

      getData();
    }

    render() {
      return (
        <Component
          {...this.props}
        />
      );
    }
  }

  WithLoadData.propTypes = {
    getData: PropTypes.func,
  };

  return WithLoadData;
};

export default withLoadData;

