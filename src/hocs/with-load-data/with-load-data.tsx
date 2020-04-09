import React from "react";

const withLoadData = (Component) => {
  type Props = React.ComponentProps<typeof Component>;

  class WithLoadData extends React.PureComponent<Props, {}> {

    componentDidMount() {
      const {getData} = this.props;

      getData();
    }

    render() {
      return (
        <Component
          {...this.props}
        />
      );
    }
  }

  return WithLoadData;
};

export default withLoadData;

