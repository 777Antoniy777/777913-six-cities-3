import React from "react";

type Map = {
  current: HTMLDivElement;
};

type Props = {
  map: Map;
};

const Map: React.FC<Props> = ({map}: Props) => {
  return (
    <div id="map" style={{height: `100%`}} ref={map}></div>
  );
};

export default Map;
