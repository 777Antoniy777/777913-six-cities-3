import React from "react";
import {Subtract} from "utility-types";

interface State {
  review: string,
  rating: boolean[],
  submitButtonStatus: boolean,
  errors: string[],
}

interface InjectingProps {
  review: string,
  rating: boolean[]
  submitButtonStatus: boolean
  errors: string[],
  onSetSubmitButtonStatus: () => void,
  isCommentValid: () => void,
  isStarChoose: () => void,
  handleInputChange: () => void,
  onClearForm: () => void,
}

const withPlaceFormReviews = (Component) => {
  type Props = React.ComponentProps<typeof Component>;
  type RestProps = Subtract<Props, InjectingProps>;

  class WithPlaceFormReviews extends React.PureComponent<RestProps, State> {
    constructor(props) {
      super(props);
      this.state = {
        review: ``,
        rating: [false, false, false, false, false],
        submitButtonStatus: true,
        errors: [],
      };
      this.setSubmitButtonStatus = this.setSubmitButtonStatus.bind(this);
      this.isCommentValid = this.isCommentValid.bind(this);
      this.isStarChoose = this.isStarChoose.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.onClearForm = this.onClearForm.bind(this);
    }

    setSubmitButtonStatus(status) {
      this.setState({
        submitButtonStatus: status,
      });
    }

    isCommentValid(value, isMaxLength) {
      const {errors} = this.state;

      if (value.length < 50) {
        return false;
      }

      if (isMaxLength) {
        if (value.length > 300) {
          this.setState({
            errors: [`Комментарий не должен превышать 300 символов`],
          });

          return false;
        }
      }

      if (errors.length > 0) {
        this.setState({
          errors: [],
        });
      }

      return true;
    }

    isStarChoose() {
      const {rating} = this.state;
      let ratingValue = null;
      const reversedRating = rating.slice().reverse();

      ratingValue = reversedRating.findIndex((elem) => {
        return elem === true;
      });

      ratingValue += 1;

      if (!ratingValue) {
        return false;
      }

      return ratingValue;
    }

    onClearForm() {
      this.setState({
        review: ``,
        rating: [false, false, false, false, false],
      });
    }

    toggleDisabled() {
      const {review} = this.state;
      const isCommentCorrect = this.isCommentValid(review, null);
      const isRating = this.isStarChoose();

      if (isCommentCorrect && isRating) {
        this.setSubmitButtonStatus(false);
        return true;
      }

      this.setSubmitButtonStatus(true);
      return false;
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
      } as Pick<State, keyof State>, this.toggleDisabled);
    }

    render() {
      const {review, rating, submitButtonStatus, errors} = this.state;

      return (
        <Component
          review={review}
          rating={rating}
          submitButtonStatus={submitButtonStatus}
          errors={errors}
          onSetSubmitButtonStatus={this.setSubmitButtonStatus}
          isCommentValid={this.isCommentValid}
          isStarChoose={this.isStarChoose}
          handleInputChange={this.handleInputChange}
          onClearForm={this.onClearForm}
          {...this.props}
        />
      );
    }
  }

  return WithPlaceFormReviews;
};

export default withPlaceFormReviews;
