import React from "react";

const withActiveItem = (Component) => {
  type Props = React.ComponentProps<typeof Component>;

  const WithActiveItem = (props: Props) => {
    const {getActiveItem} = props;

    return (
      <Component
        {...props}
        getActiveItem={getActiveItem}
      />
    );
  };

  return WithActiveItem;
};

export default withActiveItem;
