import React from "react";
import PropTypes from "prop-types";

const withActiveItem = (Component) => {
  const WithActiveItem = (props) => {

    const getActiveItem = (item) => {
      props.getActiveItem(item);
    };

    return (
      <Component
        {...props}
        getActiveItem={getActiveItem}
      />
    );
  };

  WithActiveItem.propTypes = {
    getActiveItem: PropTypes.func,
  };

  return WithActiveItem;
};

export default withActiveItem;
