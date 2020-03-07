import React from "react";
import PropTypes from "prop-types";

const withActiveItem = (Component) => {
  const WithActiveItem = (props) => {

    const onGetActiveItem = (item) => {
      props.onGetActiveItem(item);
    };

    return (
      <Component
        {...props}
        onGetActiveItem={onGetActiveItem}
      />
    );
  };

  WithActiveItem.propTypes = {
    onGetActiveItem: PropTypes.func,
  };

  return WithActiveItem;
};

export default withActiveItem;
