import React from "react";
import PropTypes from "prop-types";

const withLoadData = (Component) => {
  class WithLoadData extends React.Component {
    constructor(props) {
      super(props);
      this.map = React.createRef();
      this.state = {
        data: this.props.data,
      };
    }

    shouldComponentUpdate(nextProps, nextState) {
      const {hotelId, onGetData} = this.props;
      console.log(this.props.hotelId, nextProps.hotelId)
      console.log(this.props.data, nextProps.data)

      if (this.props.hotelId === nextProps.hotelId) {
        return false;
      }

      // if (this.props.hotelId !== nextProps.hotelId) {
      //   onGetData(hotelId);
      // }

      return true;
    }

    componentDidMount() {
      const {hotelId, onGetData} = this.props;
      console.log(`ID:`, hotelId);

      onGetData(hotelId);
    }

    componentDidUpdate() {
      const {hotelId, onGetData} = this.props;
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

