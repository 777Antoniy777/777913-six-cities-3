import React from "react";

const withPlaceFormReviews = (Component) => {
  class WithPlaceFormReviews extends React.PureComponent {
    constructor() {
      super();
      this.textarea = React.createRef();
    }

    render() {
      return (
        <Component
          textarea={this.textarea}
          {...this.props}
        />
      );
    }
  }

  return WithPlaceFormReviews;
};

export default withPlaceFormReviews;
