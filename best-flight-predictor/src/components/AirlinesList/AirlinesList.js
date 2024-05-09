import React from 'react';
import { Card, CardImgOverlay, CardImg, CardText, CardTitle, CardGroup, CardBody } from 'reactstrap';

const COLORS = [
  'gold', 
  'silver', 
  '#cd7f32', 
  'white', 
  'white', 
]

const AirlineCard = ({ airline, price, delay, color }) => {
  const imageName = airline + ".png";
  const imagePath = require(`../../assets/${imageName}`);
  const delayInMinutes = delay.toFixed(0)
  const priceInDollars = price.toFixed(2)

  return (
    <div style={{ padding: '10px' }}>
      <Card style={{ paddingTop: '10px', borderRadius: '10px', border: `4px solid ${color}` }}>
        <CardImg top style={{ height: "240px", width: "360px" }} src={imagePath} alt={airline} />
        <CardImgOverlay >
          <CardTitle tag={'h6'} style={{ color: color === 'white' ? 'black' : color }}>{airline}</CardTitle>
        </CardImgOverlay>
        <CardBody>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <CardText>
              Est Price: <span style={{ color: 'blue' }}>$ {priceInDollars}</span>
            </CardText>
            <CardText>
              Est Landing: <span style={{ color: delayInMinutes > 0 ? 'red' : 'green' }}>
                {delayInMinutes === '0' ? 'On Time' : `${Math.abs(delayInMinutes)} min ${delayInMinutes > 0 ? 'late' : 'early'}`}
              </span>
            </CardText>
          </div>
          <CardText>Cancellation Rate: {12}%</CardText>
          <CardText>Diversion Rate: {12}%</CardText>
        </CardBody>
      </Card>
    </div>
  );
};

const AirlinesList = ({ airlines }) => {
  console.log('airlines', airlines)
  return (
    <CardGroup style={{ marginTop: '10px' }}>
      {airlines.map((airline, index) => (
        <AirlineCard
          key={index}
          airline={airline.airline}
          price={airline.price}
          delay={airline.delay}
          color={COLORS[index]}
        />
      ))}
    </CardGroup>
  );
};

export default AirlinesList;
