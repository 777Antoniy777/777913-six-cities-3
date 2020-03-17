import React from "react";

const withPlaceFormReviews = (Component) => {
  class WithPlaceFormReviews extends React.PureComponent {
    constructor() {
      super();
      this.textarea = React.createRef();
      this.radioButtonFirst = React.createRef();
      this.radioButtonSecond = React.createRef();
      this.radioButtonThird = React.createRef();
      this.radioButtonForth = React.createRef();
      this.radioButtonFifth = React.createRef();
    }

    render() {
      const radioButtonRefs = [
        this.radioButtonFirst,
        this.radioButtonSecond,
        this.radioButtonThird,
        this.radioButtonForth,
        this.radioButtonFifth,
      ];

      return (
        <Component
          textarea={this.textarea}
          radioButtonRefs={radioButtonRefs}
          {...this.props}
        />
      );
    }
  }

  return WithPlaceFormReviews;
};

export default withPlaceFormReviews;
