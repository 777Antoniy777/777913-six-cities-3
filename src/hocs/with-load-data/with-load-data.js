import React from "react";
import PropTypes from "prop-types";

const withLoadData = (Component) => {
  class WithLoadData extends React.Component {
    constructor(props) {
      super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
      const {hotelId, onGetData} = this.props;
      console.log(this.props.hotelId, nextProps.hotelId)
      console.log(this.props.data, nextProps.data, this.props.data === nextProps.data)

      if (_.isEqual(this.props.data, nextProps.data) && this.props.hotelId === nextProps.hotelId) {
        return false;
      }

      // if (this.props.hotelId === nextProps.hotelId) {
      //   return false;
      // }

      return true;
    }

    componentDidMount() {
      const {hotelId, onGetData} = this.props;
      console.log(`ID:`, hotelId);

      onGetData(hotelId);
    }

    componentDidUpdate() {
      const {hotelId, onGetData, data} = this.props;
      console.log(`ID:`, hotelId);

      onGetData(hotelId);
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
    data: PropTypes.arrayOf(PropTypes.object),
  };

  return WithLoadData;
};

export default withLoadData;

