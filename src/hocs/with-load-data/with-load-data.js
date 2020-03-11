import React from "react";
import PropTypes from "prop-types";

const withLoadData = (Component) => {
  class WithLoadData extends React.PureComponent {
    constructor(props) {
      super(props);
      this.map = React.createRef();
      this.state = {
        data: this.props.data,
      };
    }

    componentDidMount() {
      const {hotelId, onGetData} = this.props;

      onGetData(hotelId);
    }

    // componentDidUpdate() {
    //   const {hotelId, onGetData} = this.props;

    //   onGetData(hotelId);
    // }

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
    data: PropTypes.arrayOf(PropTypes.object),
  };

  return WithLoadData;
};

export default withLoadData;

