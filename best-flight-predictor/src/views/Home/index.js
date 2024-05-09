import React, { useState, useEffect } from 'react';
import Input from '../../components/Input/Input';
import Dropdown from '../../components/Dropdown/Dropdown';
import fetchAirportObjectsFromAPI, { fetchDelaysAndPricesPredictions } from '../../api';
import NavBar from '../../components/Navbar/navbar';
import MyCalendar from '../../components/Calendar/Calendar';
import CustomSlider from '../../components/Slider/Slider';
import CheckboxList from '../../components/CheckBoxes/CheckBoxes';
import { Card, CardBody, CardText, Button } from 'reactstrap'
import Spirit from "../../assets/Spirit Airlines Inc..png"
import AirlinesList from '../../components/AirlinesList/AirlinesList';

const Home = () => {  
  const [airportObjects, setAirportObjects] = useState([]);
  const [selectedOrigin, setSelectedOrigin] = useState({});
  const [selectedDestination, setSelectedDestination] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [departureDayParts, setDepartureDayParts] = useState([
    { id: 'morning', name: 'Morning', checked: false },
    { id: 'afternoon', name: 'Afternoon', checked: false },
    { id: 'evening', name: 'Evening', checked: false },
    { id: 'night', name: 'Night', checked: false },
  ]);
  const [arrivalDayParts, setArrivalDayParts] = useState([
    { id: 'morning', name: 'Morning', checked: false },
    { id: 'afternoon', name: 'Afternoon', checked: false },
    { id: 'evening', name: 'Evening', checked: false },
    { id: 'night', name: 'Night', checked: false },
  ]);
  const [sliderWeights, setSliderWeights] = useState({priceWeight: 0.5, delayWeight: 0.5})
  const [delaysAndPricesList, setDelaysAndPricesList] = useState({})
  const [bestFlights, setBestFlights] = useState([])

  useEffect(() => {
    const fetchAirportObjects = async () => {
      const airportObjectsFromAPI = await fetchAirportObjectsFromAPI();
      setAirportObjects(airportObjectsFromAPI);
    };
    fetchAirportObjects();
  }, []);

  useEffect(() => {
    findBestFlights(delaysAndPricesList, sliderWeights);
  }, [delaysAndPricesList, sliderWeights]);

  useEffect(() => {
    console.log(bestFlights, Object.keys(bestFlights).length)
  }, [bestFlights])

  const handleDepartureDayParts = (id, checked) => {
    const updatedDepartureDayParts = departureDayParts.map((dayPart) =>
      dayPart.id === id ? { ...dayPart, checked } : dayPart
    );
    setDepartureDayParts(updatedDepartureDayParts);
  };
  
  const handleArrivalDayParts = (id, checked) => {
    const updatedArrivalDayParts = arrivalDayParts.map((dayPart) =>
      dayPart.id === id ? { ...dayPart, checked } : dayPart
    );
    setArrivalDayParts(updatedArrivalDayParts);
  };

  const handleSliderChange = (sliderPosition) => {
    setSliderWeights(calculateWeights(sliderPosition))
  }
  
  function calculateWeights(sliderPosition) {
    const totalParts = 21;  // Total parts including both sides and center
    let delayWeight, priceWeight;

    if (sliderPosition > 0) {
        delayWeight = (10 - sliderPosition) / totalParts;
        priceWeight = 1 - delayWeight;
    } else if (sliderPosition === 0) {
        delayWeight = 0.5;
        priceWeight = 0.5;
    } else {
        priceWeight = (10 + sliderPosition) / totalParts;
        delayWeight = 1 - priceWeight;
    }

    return { delayWeight, priceWeight };
  }

  function findBestFlights(delaysAndPricesList, sliderWeights) {
    if (Object.keys(delaysAndPricesList).length === 0)
      return null
    const { delays, prices } = delaysAndPricesList;
    if (!delays || delays && delays.length === 0 || !prices || prices && prices.length === 0)
      return null
    
    const { delayWeight, priceWeight } = sliderWeights;

    // Combine delays and prices into a single array
    const combinedArray = delays.map(delayItem => {
      const priceItem = prices.find(priceItem => priceItem.airline === delayItem.airline);
      return {
        airline: delayItem.airline,
        delay: delayItem.delay,
        price: priceItem ? priceItem.price : null
      };
    });

    // Calculate combined weight for sorting
    const sortedArray = combinedArray.sort((a, b) => {
      const combinedWeightA = a.delay * delayWeight + (a.price || 0) * priceWeight;
      const combinedWeightB = b.delay * delayWeight + (b.price || 0) * priceWeight;
      return combinedWeightA - combinedWeightB;
    });

    // Extract top 5 airlines
    const top5Airlines = sortedArray.slice(0, 5);

    // Create airline objects with slider weights
    const airlineObjects = top5Airlines.map(item => ({
      airline: item.airline,
      delay: item.delay,
      price: item.price,
      sliderWeight: item.delay * delayWeight + (item.price || 0) * priceWeight
    }));

    console.log(airlineObjects);
    setBestFlights(airlineObjects);
  }

  const handleChangeDate = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleSubmit = (event) => {
    const fetchDelaysAndPrices = async () => {
      const delaysAndPrices =
        await fetchDelaysAndPricesPredictions(
          selectedOrigin, 
          selectedDestination, 
          selectedDate, 
          departureDayParts, 
          arrivalDayParts
        );
      setDelaysAndPricesList(delaysAndPrices);
    };
    fetchDelaysAndPrices();
  };

  const handleSelectOrigin = (airport) => {
    setSelectedOrigin(airport);
  };

  const handleSelectDestination = (airport) => {
    setSelectedDestination(airport);
  };

  return (
    <div>
      <NavBar />
      {/* <div className='row'>
        <h1>AiroInsights</h1>
        <h3>Your one stop spot to get the best flight tickets!</h3>
      </div> */}
      <div
        style={{
            display: 'flex', justifyContent: 'center'
        }}
      >
        <Card
          color="light"
          outline
          style={{
              marginTop: '10px', width: '50%', boxShadow: '#c1c9c4 10px 0px 10px 0px'
          }}
        >
          <CardBody>
            <div className='row'>
              <div className='col-6'>
                <Dropdown loc="Origin" options={airportObjects} onSelect={handleSelectOrigin} />
              </div>
              <div className='col-6'>
                <Dropdown loc="Destination" options={airportObjects} onSelect={handleSelectDestination} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }} >
                <Card
                  color="light"
                  style={{ boxShadow: '#c1c9c4 0px 2px 2px 0px' }}
                >
                  <CardBody>
                    <MyCalendar style={{ flex: '1' }} onChange={handleChangeDate}/>
                  </CardBody>
                </Card>
                <div
                  style={{
                    display: 'flex',
                    flex: '1',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Card
                    color="light"
                    outline
                    style={{ marginLeft: '20px', boxShadow: '#c1c9c4 0px 4px 4px 0px' }}
                  >
                    <CardBody>
                      <CustomSlider options={["Delays", "Prices"]} onChange={handleSliderChange}/>
                    </CardBody>
                    <CardBody>
                      <CardText>Choose When You Wanna Fly</CardText>
                      <CheckboxList options={departureDayParts} onChange={handleDepartureDayParts} />
                    </CardBody>
                    <CardBody>
                      <CardText>Choose When You Wanna Land</CardText>
                      <CheckboxList options={arrivalDayParts} onChange={handleArrivalDayParts} />
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>
            <Button style={{ width: '40%', marginTop: '10px'}} color="primary" onClick={handleSubmit}>
              Search Flights
            </Button>
          </CardBody>
        </Card>
      </div>  
      {Object.keys(bestFlights).length !== 0 && (
        <AirlinesList airlines={bestFlights} />
      )}
    </div>
  );
};

export default Home;
