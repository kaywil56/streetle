import React from "react";

const Map = ({ currentCountry }) => {
  return (
    <>
      <div id="map" ref={ref} />{" "}
      <button onClick={resetStreetView}>Reload</button>
    </>
  );
};
export default Map;
