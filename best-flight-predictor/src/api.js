const fetchAirportObjectsFromAPI = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/getAirportObjects');
    if (!response.ok) {
      throw new Error('Failed to fetch airport objects');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching airport objects:', error);
    return [];
  }
};

export const fetchDelaysAndPricesPredictions = async (selectedOrigin, selectedDestination, selectedDate, departureDayParts, arrivalDayParts) => {  
  try {
    const response = await fetch('http://127.0.0.1:8000/getDelaysAndPrices', {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "origin": selectedOrigin,
        "destination": selectedDestination,
        "departureDayParts": departureDayParts,
        "arrivalDayParts": arrivalDayParts,
        "date": selectedDate.toISOString(),
        "searchDate": (new Date()).toISOString(),
      })
    });
    if (!response.ok) {
      throw new Error('Failed to fetch options');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching options:', error);
    return [];
  }
}

export default fetchAirportObjectsFromAPI;
