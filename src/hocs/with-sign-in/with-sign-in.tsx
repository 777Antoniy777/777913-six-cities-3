import React from "react";

const withSignIn = (Component) => {
  class WithSignIn extends React.PureComponent {
    constructor() {
      super();
      this.state = {
        email: ``,
        password: ``,
      };

      this.handleInputChange = this.handleInputChange.bind(this);
      this.isFieldEmpty = this.isFieldEmpty.bind(this);
      this.isEmailValid = this.isEmailValid.bind(this);
    }

    isFieldEmpty(value) {
      if (value.length === 0) {
        return false;
      }

      return true;
    }

    isEmailValid(value) {
      const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!(regexp.test(value))) {
        return false;
      }

      return true;
    }

    handleInputChange(evt) {
      const target = evt.target;
      const name = target.name;
      const value = target.value;

      this.setState({
        [name]: value,
      });
    }

    render() {
      const {email, password} = this.state;

      return (
        <Component
          email={email}
          password={password}
          onInputChange={this.handleInputChange}
          isFieldEmpty={this.isFieldEmpty}
          isEmailValid={this.isEmailValid}
          {...this.props}
        />
      );
    }
  }

  return WithSignIn;
};

export default withSignIn;
