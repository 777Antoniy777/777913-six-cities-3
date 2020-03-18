import React from "react";

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

    // isStarChoose() {
    //   const {stars} = this.state;
    //   let rating = null;

    //   const radioButton = stars.find((elem) => {
    //     return elem.current.checked === true;
    //   });

    //   if (radioButton) {
    //     rating = radioButton.current.value;
    //   }

    //   if (!rating) {
    //     return false;
    //   }

    //   return rating;
    // }

    handleInputChange(evt) {
      const {setSubmitButtonStatus} = this.props;
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
      });

      if (this.isCommentCorrect && this.isRating) {
        setSubmitButtonStatus(false);
      } else {
        setSubmitButtonStatus(true);
      }
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

  return WithPlaceFormReviews;
};

export default withPlaceFormReviews;
