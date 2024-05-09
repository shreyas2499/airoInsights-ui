import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = ({ onChange }) => {
  const [date, setDate] = useState(new Date());

  const handleChange = (newDate) => {
    setDate(newDate);
    onChange(newDate);
  };

  return (
    <div>
      <Calendar onChange={handleChange} value={date} />
    </div>
  );
};

export default MyCalendar;
