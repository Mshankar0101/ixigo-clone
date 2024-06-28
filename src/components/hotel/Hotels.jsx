import React, { useEffect, useState } from 'react'
import "../../styles/Hotel.css";
import dayjs from 'dayjs';
import {Autocomplete, TextField, Box, Typography, ButtonBase} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {STATE_CITIES} from "../../components/data.js";
import {FaCity} from "react-icons/fa";
import Crousel from '../common/Crousel.jsx';
import img1 from '../../images/img1.webp';
import img2 from '../../images/img2.webp';
import img3 from '../../images/img3.webp';
import img4 from '../../images/img4.webp';
import img5 from '../../images/img5.webp';

const Hotels = () => {
  // date picker 
  const [checkInDate, setCheckInDate]= useState(dayjs(new Date()));
  const [checkOutDate, setCheckOutDate]= useState(dayjs(new Date()));
  useEffect(()=>{
    console.log("checkInDate",checkInDate);
    console.log("checkOutDate",checkOutDate);
  },[checkOutDate,checkInDate])

  //fething api for offers
 const [offer, setOffers] = useState([]);
 const fetchOffers = ()=>{
    fetch("https://academics.newtonschool.co/api/v1/bookingportals/offers?filter={\"type\":\"HOTELS\"}&&limit=30",{
        method: 'get',
        headers:{
            'projectID': '9h69a26iogeq'
        }
    })
    .then((res)=> res.json())
    .then((result)=> result.data)
    .then((data)=>setOffers(data.offers))
    .catch((err)=> console.log(err));
 }
    useEffect(()=>{  
        fetchOffers(); 
        console.log(offer);
    },[]);

  return (
    <div className='hotel-home-page'>
       <div className='hotel-poster'>
           <div className='hotel-poster-heading'>
               <p>Book Hotels</p>
           </div>
           <div className='hotel-search-container'> 
              <div className='hotel-search-box'>
                  <Autocomplete
                  freeSolo
                  disableClearable
                  options={STATE_CITIES}
                  getOptionLabel={(option) => option.city}
                  renderOption={(props, option) => (
                    <Box component="li" sx={{
                      display:'flex',
                      gap:'10px'
                      }} 
                    {...props}
                    >
                      <Box sx={{padding:'10px'}}>
                        <FaCity className='bus-city-icon' />
                      </Box>
                      <Box 
                      >
                        <Typography sx={{fontSize:'18px', margin:'0px',lineHeight:1.2}} variant='h6' >{option.city} </Typography>
                        <Typography sx={{fontSize:'14px', margin:'0px',lineHeight:1}} variant='subtitle1' > {option.state}</Typography>
                      </Box>
                    </Box>
                  )}

                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Destination"
                      // placeholder='From Station'
                      InputProps={{
                        ...params.InputProps,
                        type: 'search',
                      }}
                      // variant="filled"
                      
                    />
                   )}
                 />
                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{backgroundColor:"#f2f2f2", height:'64px', width:'100%'}}
                      label="Check-in"
                      value={checkInDate}
                      onChange={(newValue) => setCheckInDate(newValue)}
                      format={'ddd, DD MMM'}
                      minDate={checkInDate}
                    />
                 </LocalizationProvider>
                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{backgroundColor:"#f2f2f2", height:'64px', width:'100%'}}
                      label="Check-out"
                      value={checkOutDate}
                      onChange={(newValue) => setCheckOutDate(newValue)}
                      format={'ddd, DD MMM'}
                      minDate={checkOutDate}
                    />
                 </LocalizationProvider>

                 <TextField
                  sx={{backgroundColor:"#f2f2f2", height:'64px', width:'100%'}}
                  id="outlined-basic"
                  label="Rooms & Guests"
                   
                  />

                  <button className='search-button'>
                    Search
                  </button>
              </div>
           </div>
       </div>
       <div className='hotel-offers'>
           <h2>Offers For You </h2> 
            <Crousel offer={offer} />
       </div>
       <div className='why-ixigo-hotels'>
           <h2>Why Book Hotels With ixigo?</h2>
           <div className='all-img-container'>
              <div>
                <img src={img2} alt="img1" />
              </div>
              <div>
                <img src={img1} alt="img2" />
              </div>
              <div>
                <img src={img3} alt="img3" />
              </div>
              <div>
                <img src={img4} alt="img4" />
              </div>
              <div>
                <img src={img5} alt="img5" />
              </div>
           </div>
       </div>
    </div>
  )
}

export default Hotels