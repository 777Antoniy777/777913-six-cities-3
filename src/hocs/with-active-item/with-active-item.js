import React from "react";
import PropTypes from "prop-types";

const withActiveItem = (Component) => {
  class WithActiveItem extends React.PureComponent {
    constructor() {
      super();
      // this.state = {
      //   activeItem: null,
      // };

      // this.onGetActiveItem = this.onGetActiveItem.bind(this);
    }

    // onGetActiveItem(item) {
    //   this.setState({
    //     activeItem: item,
    //   });
    // }

    render() {
      return (
        <Component
          {...this.props}
          // onGetActiveItem={this.onGetActiveItem}
        />
      );
    }
  }

  return WithActiveItem;
};

export default withActiveItem;
