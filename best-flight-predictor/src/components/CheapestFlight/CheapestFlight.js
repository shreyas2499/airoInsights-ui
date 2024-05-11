import React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

const CheapestFlight = ({ selectedDate, searchWeek }) => {

  // Function to get the week of the year from an ISO string
  function getWeekOfYear(isoString) {
    const date = new Date(isoString);
    const onejan = new Date(date.getFullYear(), 0, 1);
    const millisecsInDay = 86400000;
    return Math.ceil(((date - onejan) / millisecsInDay + onejan.getDay() + 1) / 7);
  }

  let flightWeek = getWeekOfYear(selectedDate.toISOString())
  let week = searchWeek[0]['search_week']

  return (
    <Card style={{ display: 'flex', flexDirection: 'row', boxShadow: '#c1c9c4 10px 0px 10px 0px' }}>
      <CardBody>
        <CardTitle tag="h3">Cheapest Flights can be achieved in {Math.abs(week - flightWeek)} weeks from now</CardTitle>
      </CardBody>
    </Card>
  );
};

export default CheapestFlight;
