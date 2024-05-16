import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import {format} from "date-fns";
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const Datepicker = () => {

      const [currentDate, setCurrentDate] = useState(new Date());
  return (
    <DatePicker
      selected={currentDate}
      onChange={(date) => setCurrentDate(date)}
      dateFormat={'EEE, dd MMM'}
      monthsShown={2}
      minDate={new Date()}
      onKeyDown={(e) => {
            e.preventDefault();
      }}
    />
  )
}

export default Datepicker