import React from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Datepicker = ({currentDate,setCurrentDate}) => {

      
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