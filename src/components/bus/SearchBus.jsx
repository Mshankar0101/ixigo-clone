import React,{useEffect, useState} from 'react';
import {Autocomplete, TextField, Box, Typography, InputAdornment,Slider, Accordion, AccordionSummary, AccordionDetails} from "@mui/material";
import { MdLocationPin } from "react-icons/md";
import { FaBus, FaCity, FaWifi, FaInbox, FaStar} from "react-icons/fa";
import {STATE_CITIES} from "../../components/data.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../../styles/BusSearch.css';
import { TbAirConditioning } from "react-icons/tb";
import { TbAirConditioningDisabled } from "react-icons/tb";
import sunrise from '../../images/sunrise.png';
import cloudy from '../../images/cloudy.png';
import sun from '../../images/sun.png';
import cloudynight from '../../images/cloudy-night.png';
import { FaBottleWater, FaChargingStation } from "react-icons/fa6";
import { BiSolidBlanket } from "react-icons/bi";
import { MdExpandMore } from "react-icons/md";

const SearchBus = () => {
    const [filterObj, setFilterObj]= useState({});

    //datepicker date
    const [currentDate, setCurrentDate] = useState(new Date());


    //sorting of bus
    const [sortSelectedOption, setSortSelectedOption]= useState({});
    const [sortSelected, setSortSelected]= useState("");
    const handleSortChange = (value)=>{
        if(sortSelected === value){
            setSortSelected("");
            setSortSelectedOption({});
        }else{
            if(value === "seats" || value === "ratings"){
                setSortSelectedOption({[value]: -1});
            }else{
                setSortSelectedOption({[value]:1});
            }
             console.log(value);
             setSortSelected(value);
        }
    }


    // price filter
    const [priceRange, setPriceRange] = useState([500, 3000]);
    const updatePriceRange = (e, val)=>{
        setPriceRange(val);
        setFilterObj((pre)=>{
            return {...pre, "fare":{"$lte":val[1],"$gte":val[0]}}
        })
       
    }


    //departure time filter 
    const [isTime, setIsTime]=useState({isEarlymorningFlights:false,isMorningFlights:false,isMiddayFlights:false,isNightFligh:false});
    // const [departureTime, setDepartureTime]=useState({});
    const earlymorningFlights = ()=>{
        if(isTime.isEarlymorningFlights){
            const {departureTime, ...rest}= filterObj;
            setFilterObj(rest);
            setIsTime({isEarlymorningFlights:false,isMorningFlights:false,isMiddayFlights:false,isNightFligh:false})
            // setDepartureTime({"$lte":"23:59","$gte":"01:00"});
        }else{
            setFilterObj((pre)=>{
                return {...pre, "departureTime":{"$lte":"06:00","$gte":"01:00"}}
            })
            // setDepartureTime({"$lte":"06:00","$gte":"01:00"});
            setIsTime({isEarlymorningFlights:true,isMorningFlights:false,isMiddayFlights:false,isNightFligh:false})
        }
    }
    const morningFlights = ()=>{
        if(isTime.isMorningFlights){
            const {departureTime, ...rest}= filterObj;
            setFilterObj(rest);
            setIsTime({isEarlymorningFlights:false,isMorningFlights:false,isMiddayFlights:false,isNightFligh:false})
            // setDepartureTime({"$lte":"23:59","$gte":"01:00"});
        }else{
            setFilterObj((pre)=>{
                return {...pre, "departureTime":{"$lte":"12:00","$gte":"06:00"}}
            })
            // setDepartureTime({"$lte":"12:00","$gte":"06:00"});
            setIsTime({isEarlymorningFlights:false,isMorningFlights:true,isMiddayFlights:false,isNightFligh:false})
        }
    }
    const middayFlights = ()=>{
        if(isTime.isMiddayFlights){
            const {departureTime, ...rest}= filterObj;
            setFilterObj(rest);
            setIsTime({isEarlymorningFlights:false,isMorningFlights:false,isMiddayFlights:false,isNightFligh:false})
            // setDepartureTime({"$lte":"23:59","$gte":"01:00"});
        }else{
            setFilterObj((pre)=>{
                return {...pre, "departureTime":{"$lte":"18:00","$gte":"12:00"}}
            })
            // setDepartureTime({"$lte":"18:00","$gte":"12:00"});
            setIsTime({isEarlymorningFlights:false,isMorningFlights:false,isMiddayFlights:true,isNightFligh:false})
        }
       
    }
    const nightFlights = ()=>{
        if(isTime.isNightFligh){
            const {departureTime, ...rest}= filterObj;
            setFilterObj(rest);
            setIsTime({isEarlymorningFlights:false,isMorningFlights:false,isMiddayFlights:false,isNightFligh:false});
            // setDepartureTime({"$lte":"23:59","$gte":"01:00"});
        }else{
            setFilterObj((pre)=>{
                return {...pre, "departureTime":{"$lte":"23:59","$gte":"18:00"}}
            })
            // setDepartureTime({"$lte":"23:59","$gte":"18:00"});
            setIsTime({isEarlymorningFlights:false,isMorningFlights:false,isMiddayFlights:false,isNightFligh:true});
        }
        
    }


    // bus type filter
    const [type, setType]= useState({ac:false, nonAc:false});
    const handleBusTypeFilter = (busType)=>{
          if(busType === "ac" &&  type.ac === false){
            setFilterObj((pre)=>{
               return {...pre , "type": "AC"} 
            })
            setType({ac:true, nonAc:false});
          }
          else if(busType === "nonAc" &&  type.nonAc === false){
            setFilterObj((pre)=>{
                return {...pre , "type": "Non-AC"} 
             })
             setType({ac:false, nonAc:true});
          }
          else{
            const {type, ...rest}= filterObj;
            setFilterObj(rest);
            setType({ac:false, nonAc:false});
          }
    }



    //formatted date for search card
  const dateObj = new Date(currentDate);
  const options = { weekday: 'short', day: '2-digit', month: 'short' };
  const formattedDate = dateObj.toLocaleDateString('en-US', options);  

  //duration
  function calculateDuration(departureTime, arrivalTime) {
    // Parse the departure and arrival times
    const [depHours, depMinutes] = departureTime.split(':').map(Number);
    const [arrHours, arrMinutes] = arrivalTime.split(':').map(Number);
  
    // Create Date objects for both times on the same day
    const depDate = new Date();
    depDate.setHours(depHours, depMinutes, 0, 0);
  
    const arrDate = new Date();
    arrDate.setHours(arrHours, arrMinutes, 0, 0);
  
    // If the arrival time is before the departure time, add one day to the arrival time
    if (arrDate < depDate) {
      arrDate.setDate(arrDate.getDate() + 1);
    }
  
    // Calculate the difference in milliseconds
    const durationMs = arrDate - depDate;
  
    // Convert the difference to hours and minutes
    const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
    const durationMinutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
  
    return `${durationHours} hour${durationHours !== 1 ? 's' : ''} ${durationMinutes} minute${durationMinutes !== 1 ? 's' : ''}`;
  }   




   useEffect(()=>{
     console.log("filterObj", filterObj);
     console.log("sortSelectedOption", sortSelectedOption);
   },[filterObj, sortSelectedOption])

  return (
    <div className='bus-search-page'>
          <div className='bus-search-container' style={{position:'relative',top:'0px'}}>
            <div className='bus-search-box'>
                <Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
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
                      // label="From Station"
                      placeholder='From Station'
                      InputProps={{
                        ...params.InputProps,
                        type: 'search',
                        startAdornment: (
                          <InputAdornment position="start">
                            <FaBus className='bus-icon' />
                          </InputAdornment>
                        ),
                      }}
                      variant="filled"
                      multiline
                    />
                   )}
                />
                <Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
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
                        <Typography sx={{fontSize:'14px', margin:'0px',lineHeight:1.2}} variant='subtitle1' > {option.state}</Typography>
                      </Box>
                    </Box>
                  )}

                  renderInput={(params) => (
                    <TextField
                      {...params}
                      // label="To Station"
                      placeholder='To Station'
                      InputProps={{
                        ...params.InputProps,
                        type: 'search',
                        startAdornment: (
                          <InputAdornment position="start">
                            <MdLocationPin className='location-icon' />
                          </InputAdornment>
                        ),
                      }}
                      variant="filled"
                      multiline
                   />
                  )}
               />
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
                <button className='search-button'>Search</button>
            </div>
          </div>
          <div className='bus-sort'>
                <div>Sort By:</div>
                <div><p className={sortSelected=== "fare"?'second-clicked':"second"} onClick={()=>handleSortChange('fare')}>Price</p></div>
                <div><p className={sortSelected=== "seats"?'third-clicked':"third"}onClick={()=>handleSortChange('seats')}>Seats</p></div>
                <div><p className={sortSelected=== "ratings"?'fourth-clicked':"fourth"} onClick={()=>handleSortChange('ratings')}>Rating</p></div>
                <div><p className={sortSelected=== "arrivalTime"?'fifth-clicked':"fifth"}onClick={()=>handleSortChange('arrivalTime')}>Arrival Time</p></div>
                <div><p className={sortSelected=== "departureTime"?'sixth-clicked':"sixth"} onClick={()=>handleSortChange('departureTime')}>Departure Time</p></div>
         </div>
         <div className='bus-filter-searchCard'>
            <div className='bus-filter'>
                <h3>Filters</h3>
                <div className='bus-type'>
                    <p>Bus Type</p>
                    <div className='bus-type-list'>
                        <div style={{border: (type.ac? '1px solid #DC6437': 'none')}} className='ac' onClick={()=>handleBusTypeFilter("ac")}>
                            <TbAirConditioning className={type.ac? 'acIcon-clicked': 'acIcon'}/>
                            <p style={{color: (type.ac? '#DC6437': 'rgb(94,97,110)')}}>AC</p>
                        </div>
                        <div style={{border: (type.nonAc? '1px solid #DC6437': 'none')}} className='non-ac'onClick={()=>handleBusTypeFilter("nonAc")}>
                            <TbAirConditioningDisabled className={type.nonAc? 'non-ac-icon-clicked': 'non-ac-icon'}/>
                            <p style={{color: (type.nonAc? '#DC6437': 'rgb(94,97,110)')}}>Non AC</p>
                        </div>
                    </div>
                </div>
                <div className='bus-price-range'>
                            <p>Price Range</p>
                            <div className='bus-filter-range-box'>
                                 <Slider
                                  sx={{
                                    ".MuiSlider-thumb": {bgcolor: '#DC6437', height: '25px', width:'25px', border:'0.5px solid orange'},
                                    ".MuiSlider-track":{bgcolor: '#DC6437', height:"1px"},
                                    ".MuiSlider-rail":{bgcolor: '#DC6437'},
                                   
                                  }}
                                  value={priceRange}
                                  min={500}
                                  max={3000}
                                  onChange={updatePriceRange}
                                 />
                                 <div className='price-display'>
                                    <p>{priceRange[0]}</p>
                                    <p>{priceRange[1]}</p>
                                 </div>
                               
                            </div>        
                </div>
                <div className='bus-filter-main'>
                          <div className='filter-time'>
                                <p className='departure'>Departure Time</p>
                             <div className='bus-filter-time'> 
                                <div className='morning-day-night'>
                                    <div className={(isTime.isEarlymorningFlights?'icon-div-border': 'icon-div')} onClick={earlymorningFlights}>
                                        <img alt='sunrise' src={sunrise}/>
                                        <p>Early Morning</p>
                                        <p>Before 6AM</p>
                                    </div>
                                    <div className={(isTime.isMorningFlights?'icon-div-border': 'icon-div')} onClick={morningFlights}>
                                        <img alt='morning' src={sun} />
                                        <p>Morning</p>
                                        <p>6AM-12PM</p>
                                    </div>
                                </div>
                                <div  className='morning-day-night'>
                                        <div className={(isTime.isMiddayFlights?'icon-div-border': 'icon-div')}  onClick={middayFlights}>
                                            <img alt='midday' src={cloudy} />
                                            <p>Mid Day</p>
                                            <p>12PM-6PM</p>
                                        </div>
                                         <div className={(isTime.isNightFligh?'icon-div-border': 'icon-div')} onClick={nightFlights}>
                                            <img alt='cloudynight' src={cloudynight} />
                                            <p>Night</p>
                                            <p>After 6pm</p>
                                        </div>
                                </div>
                              </div>
                        </div>        
                </div>
                
            </div>
            <div className='search-cards'>
             {   
            //   const duration = calculateDuration(departureTime, arrivalTime);
              <div className='bus-searchCard'>
                <div className='name-rating-amenities'>
                    <div className='name-type'>
                        <h2>Train name</h2>
                        <div> <TbAirConditioning style={{height:'20px', width:'20px', color:'#DC6437'}} /> <span>AC</span></div>
                    </div>
                    <div className='rating-amenities'>
                        <div >
                           <FaStar style={{color:'white'}} />
                           <span> {Math.floor(Math.random() * 5) + 1}</span>
                        </div>
                        <div className='amenities'>
                           <Accordion
                             sx={{
                                border:'1px solid #DC6437',
                                height:'50px',
                                width:'120px'
                               
                             }}
                           >
                                <AccordionSummary
                                expandIcon={<MdExpandMore style={{width:'20px', height:'20px', color: '#212121'}} />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                                 sx={{
                                    color:'#212121',
                                    fontWeight:'400', 
                                 }}
                                >
                                  Amenities
                                </AccordionSummary>
                                <AccordionDetails
                                  sx={{
                                       backgroundColor:'white', 
                                  }}
                                >
                                    <div className='amenties-border'>
                                       <FaWifi className='amenities-icon' />
                                       <span> Wifi</span>
                                    </div >
                                    <div className='amenties-border'>
                                      <FaChargingStation className='amenities-icon' />
                                      <span> Charging Point</span>
                                    </div>
                                    <div className='amenties-border'> 
                                       <FaBottleWater className='amenities-icon'/> 
                                       <span> Water Bottle</span>
                                    </div>
                                    <div className='amenties-border'>
                                       <BiSolidBlanket className='amenities-icon' />
                                       <span> Blanket</span>
                                    </div>
                                    <div className='amenties-border'>
                                       <FaInbox className='amenities-icon' /> 
                                       <span> Snack Box</span>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </div>
                </div>

                <div className='source-duration-destination'>
                        <div className='source'>
                            <p>{"source"}</p>
                            <p>{"departureTime"}</p>
                            <p>{"formattedDate"}</p>
                        </div>
                        <div className='duration'>
                            <p>{"travelDuration"}</p>
                            <img alt='duration' src='https://edge.ixigo.com/st/vimaan/_next/static/media/line.9641f579.svg'/>
                        </div>
                        <div className='destination'>
                            <p>{"destination"}</p>
                            <p>{"arrivalTime"}</p>
                            <p>{"formattedDate"}</p>
                        </div>
                </div>

              </div>
            }
            </div>

         </div>
        
    </div>
  )
}

export default SearchBus