import React from "react";
import PropTypes from "prop-types";

const withPlaceFormReviews = (Component) => {
  class WithPlaceFormReviews extends React.PureComponent {
    constructor() {
      super();
      this.state = {
        review: ``,
        rating: [false, false, false, false, false],
      };
      this.isCommentValid = this.isCommentValid.bind(this);
      this.isStarChoose = this.isStarChoose.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
    }

    isCommentValid(value) {
      if (value.length < 50 || value.length > 300) {
        return false;
      }

      return true;
    }

    isStarChoose() {
      const {rating} = this.state;
      let ratingValue = null;

      const radioButton = rating.find((elem) => {
        return elem === true;
      });

      if (radioButton) {
        ratingValue = radioButton;
      }

      if (!ratingValue) {
        return false;
      }

      return ratingValue;
    }

    toggleDisabled() {
      const {setSubmitButtonStatus} = this.props;
      const {review} = this.state;
      const isCommentCorrect = this.isCommentValid(review);
      const isRating = this.isStarChoose();

      if (isCommentCorrect && isRating) {
        setSubmitButtonStatus(false);
      } else {
        setSubmitButtonStatus(true);
      }
    }

    handleInputChange(evt) {
      const {rating} = this.state;
      const target = evt.target;
      const type = target.type;
      const name = target.name;
      let value;

      if (type === `radio`) {
        const id = parseInt(target.id, 10);
        const index = id - 1;
        const checked = target.checked;

        rating.fill(false);
        value = [...rating.slice(0, index), checked, ...rating.slice(index + 1)];
        value.reverse();
      } else {
        value = target.value;
      }

      this.setState({
        [name]: value,
      }, this.toggleDisabled);
    }

    render() {
      const {review, rating} = this.state;

      return (
        <Component
          review={review}
          rating={rating}
          isCommentValid={this.isCommentValid}
          isStarChoose={this.isStarChoose}
          handleInputChange={this.handleInputChange}
          {...this.props}
        />
      );
    }
  }

  WithPlaceFormReviews.propTypes = {
    setSubmitButtonStatus: PropTypes.func,
  };

  return WithPlaceFormReviews;
};

export default withPlaceFormReviews;
