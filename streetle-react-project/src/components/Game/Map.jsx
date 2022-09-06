import React from "react";

const Map = ({ currentCountry }) => {
  return (
    <div>
      <img src={currentCountry.url} alt="Street Picture" />
    </div>
  );
};
export default Map;
