import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { CardText } from 'reactstrap'

const CustomSlider = ({ options, onChange }) => {
  const [value, setValue] = useState(0);

  const handleSliderChange = (newValue) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div>
      <CardText>Optimize Flights By</CardText>
      <div style={{ margin: '15px', display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: 1, textAlign: 'right', marginRight: '15px' }}>{options[0]}</div>
        <div style={{ flex: 4 }}>
          <Slider
            min={-10}
            max={10}
            defaultValue={0}
            value={value}
            startPoint={0}
            onChange={handleSliderChange}
          />
        </div>
        <div style={{ flex: 1 }}>{options[1]}</div>
      </div>
      {/* <p>{Math.abs(value)}</p> */}
    </div>
  );
};

export default CustomSlider;

