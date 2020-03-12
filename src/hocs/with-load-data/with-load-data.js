import React from "react";
import PropTypes from "prop-types";

const withLoadData = (Component) => {
  class WithLoadData extends React.Component {
    constructor(props) {
      super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
      const {offerId, data, status} = this.props;
      console.log(`this ID:`, this.props.offerId, `next ID:`, nextProps.offerId);
      console.log(data, nextProps.data, _.isEqual(data, nextProps.data));

      if (_.isEqual(data, nextProps.data) && offerId === nextProps.offerId) {
        console.log(`ОСТАНОВИЛ ЗАГРУЗКУ`)
        return false;
      }

      return true;
    }

    componentDidMount() {
      const {offerId, onGetData, onSetCommentsStatus} = this.props;
      console.log(`Зашел в componentDidMount`);

      onSetCommentsStatus(`mount`);
      onGetData(offerId);
    }

    componentDidUpdate() {
      const {offerId, status, onGetData, data, onSetCommentsStatus} = this.props;
      console.log(`Зашел в componentDidUpdate`);

      if (status !== `mount`) {
        onGetData(offerId);
      }
      if (status !== `update`) {
        onSetCommentsStatus(`update`);
      }
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

