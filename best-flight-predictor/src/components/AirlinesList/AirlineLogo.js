import React from 'react';

const AirlineLogo = ({ airline }) => {
  // Assuming airline names are formatted consistently
  const imageName = airline.replace(/ /g, "_") + ".png";
  const imagePath = require(`../../assets/${imageName}`);

  return <img src={imagePath.default} alt={airline} />;
};

export default AirlineLogo;
