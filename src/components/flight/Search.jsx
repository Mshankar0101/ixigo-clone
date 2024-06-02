import React,{useState, useEffect, useContext} from 'react';
import ScrollToTop from '../ScrollToTop';
 import '../../styles/FlightSearch.css';
 import sunrise from '../../images/sunrise.png';
 import cloudy from '../../images/cloudy.png';
 import sun from '../../images/sun.png';
 import cloudynight from '../../images/cloudy-night.png';
 import {Slider} from '@mui/material';
 import FlightSearchContext from '../../context/Contexts'
 import FlightSearchBox from './FlightSearchBox';
 import downarrow from '../../images/downarrow.png'
 import handbag from '../../images/handbag.png'

const Search = () => {
    const [filterObj, setFilterObj]= useState({});
    // const [sortObj, setSortObj]= useState({});

   //logic for stops filter
   const [stops, setStop]= useState(null);
   const handleCheckboxNonstop = (event)=>{
    const {checked}= event.target;
        if(checked){
            setStop(0);
            setFilterObj((pre)=>{
                return {...pre, "stops":0}
            })
        }else{
            setStop(null);
           const {stops, ...rest}= filterObj;
           setFilterObj(rest);
        }
        console.log("checked",checked);
        
   }

   const handleCheckboxOnestop = (event)=>{
    const {checked}= event.target;
        if(checked){
            setStop(1);
            setFilterObj((pre)=>{
                return {...pre, "stops":1}
            })
        }else{
            setStop(null);
            const {stops, ...rest}= filterObj;
           setFilterObj(rest);
        }
       
   }
   const handleCheckboxTwoplusstop = (event)=>{
    const {checked}= event.target;
        if(checked){
            setStop(2);
            setFilterObj((pre)=>{
                return {...pre, "stops":2}
            })
        }else{
            setStop(null);
            const {stops, ...rest}= filterObj;
            setFilterObj(rest);
        }    
   }

   

   //price range slider filter
   const [priceRange, setPriceRange] = useState([2000, 10000]);
    const updatePriceRange = (e, val)=>{
        setPriceRange(val);
        setFilterObj((pre)=>{
            return {...pre, "ticketPrice":{"$lte":val[1],"$gte":val[0]}}
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

    const [airlines, setAirlines] = useState({});
      const handleAirlineChange = (e)=>{
        const {name, value, checked}= e.target;
        if(checked){
            setFilterObj((pre)=>{
                return {...pre, "airline":value}
            })
            setAirlines({[name]:value});
        }else{
            const {airline, ...rest}= filterObj;
            setFilterObj(rest);
            setAirlines({});
        }  
          console.log(airlines);
      }

    //sorting of flights
    const [sortSelectedOption, setSortSelectedOption]= useState({});
    const [sortSelected, setSortSelected]= useState("");
    const handleSortChange = (e)=>{
        const {name, value}= e.target;
        setSortSelectedOption({[name]:1});
        console.log(name,value);
        setSortSelected(name);
    }
    
    
    
  
  

    //retrieving seach feild data from context
    const {searchFeilds} = useContext(FlightSearchContext);
    const {value, toValue, date} = searchFeilds;
    var daysArr;
    var source;
    var destination;
    var day;
    try{
        daysArr = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
        source = value.split(" - ")[0];
        destination = toValue.split(" - ")[0];
        day = daysArr[date.getDay()];
    }catch(e){
        console.log(e.name,e.message);
    }

//display flight
 const [flight, setFlight] = useState([])
 
      const fetchFlights = (source,destination,day)=>{
         const filterString = Object.keys(filterObj).length !== 0 
            ? `&filter=${encodeURIComponent(JSON.stringify(filterObj))}` 
            : "";
        //sortSelectedOption
        const sortString = Object.keys(sortSelectedOption).length !== 0 
              ? `&sort=${encodeURIComponent(JSON.stringify(sortSelectedOption))}` 
              : "";
           // `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${source}","destination":"${destination}"}&day=${day}${Object.keys(filterObj).length !== 0 ? `&filter=${encodeURIComponent(JSON.stringify(filterObj))}` : "" }`
         const url = `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${source}","destination":"${destination}"}&day=${day}${filterString}${sortString}`
           fetch(url, 
            {
               method: 'get',
               headers:{
                   'projectID': '9h69a26iogeq'
               }
           })
           .then((response) => response.json())
           .then((result) =>{
               setFlight(result.data.flights);
               console.log(result.data.flights);
           
           })
           .catch((error) => console.error(error));
      }
 
    //hadling searches on search page
    const handleSubmition = ()=>{
       // console.log("inside handle submition");
        if(value && toValue && date){ 
            console.log(source,destination, day);
            fetchFlights(source, destination, day);  
        }
    }
    useEffect(()=>{
        console.log("useeffect");
        handleSubmition();
    },[searchFeilds,filterObj, sortSelectedOption]);


  return (
    <>
    <ScrollToTop/>
        <FlightSearchBox handleSubmition={handleSubmition} />
    
        <div className='flight-filter-search-main-container'>
            <div className="flight-filter-search-container">

                <div className='flight-filter-container-relative'> 
                  <div className='white-round'>

                    <div className='flight-text-filter'>
                        <p>Filters</p>
                    </div>
                    <div className='border-bottom'></div>
                    <div className='flight-filter-options'>
                        <div className='stops'>
                            <p className='stops-text'>Stops</p>
                            <li>
                                <div>
                                <p>Non-Stop</p> 
                                </div>
                                <div>
                                <input type="checkbox" checked={stops === 0} name="non-stop" value="0" onChange={handleCheckboxNonstop} />
                                </div>
                            </li>
                            <li>
                                <div>
                                <p>1 Stop</p> 
                                </div>
                                <div>
                                <input type="checkbox" checked={stops === 1} name="one-stop" value="1" onChange={handleCheckboxOnestop} />
                                </div>
                            </li>
                            <li>
                                <div>
                                <p>2+ Stops</p> 
                                </div>
                                <div>
                                <input type="checkbox" checked={stops === 2} name="twoplus-stops" value="2" onChange={handleCheckboxTwoplusstop} />
                                </div>
                            </li>
                        </div>
                        <div className='flight-filter-range'>
                            <p>Flight Price</p>
                            <div className='flight-filter-range-box'>
                                 <Slider
                                  sx={{
                                    ".MuiSlider-thumb": {bgcolor: 'white', height: '25px', width:'25px', border:'0.5px solid #0770E4'},
                                    ".MuiSlider-track":{bgcolor: '#0770E4', height:"1px"},
                                    ".MuiSlider-rail":{bgcolor: '#0770E4'},
                                  }}
                                  value={priceRange}
                                  min={2000}
                                  max={10000}
                                  onChange={updatePriceRange}
                                 />
                                 <div className='price-display'>
                                    <p>{priceRange[0]}</p>
                                    <p>{priceRange[1]}</p>
                                 </div>
                               
                            </div>
                        </div>
                        <div className='flight-filter-time'>
                            <div className='filter-time'>
                                <p className='departure'>Departure from {value?value.split("-")[1]:'Airport'}</p>
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
                                <div className='morning-day-night'>
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
                        <div className='filter-airlines' style={{paddingTop:'20px'}}>
                           <p className='heading'>Popular Airlines</p>
                           <li>
                                <div>
                                    <img alt='airindia' src='https://images.ixigo.com/img/common-resources/airline-new/AI.png' />
                                </div>
                                <p>Air India</p>
                                <input type='checkbox' value="65144a1b664a43628887c45d" checked={airlines.airline === "65144a1b664a43628887c45d"} name="airline" onChange={handleAirlineChange}/>
                           </li>
                           <li>
                                <div>
                                    <img alt='indigo' src='https://images.ixigo.com/img/common-resources/airline-new/6E.png' />
                                </div>
                                <p>Indigo</p>
                                <input name="airline"  value="65144a1b664a43628887c45e" checked={airlines.airline === "65144a1b664a43628887c45e"} onChange={handleAirlineChange} type='checkbox'/>
                           </li>
                           <li>
                                <div>
                                    <img alt='spicejet' src='https://images.ixigo.com/img/common-resources/airline-new/SG.png' />
                                </div>
                                <p>SpiceJet</p>
                                <input name="airline" value="65144a1b664a43628887c45f" checked={airlines.airline === "65144a1b664a43628887c45f"} onChange={handleAirlineChange} type='checkbox'/>
                           </li>
                           <li>
                                <div>
                                    <img alt='vistara' src='https://images.ixigo.com/img/common-resources/airline-new/UK.png' />
                                </div>
                                <p>Vistara</p>
                                <input name="airline" value="65144a1b664a43628887c460" checked={airlines.airline === "65144a1b664a43628887c460"} onChange={handleAirlineChange} type='checkbox'/>
                           </li>
                        </div>
                    </div>

                </div>
                </div>

                <div className='flight-onsearch-container'>
                     <div className='sort-by'>
                        <p className='heading'>Sort by</p>
                        <div className='sort-by-container'>
                            <div className='sorting-options'>
                                    <input
                                    type='radio'
                                    value={1}
                                    name="ticketPrice"
                                    checked={sortSelected === 'ticketPrice'}
                                    onChange={handleSortChange}
                                    />
                                    <div>
                                        <p>Price
                                         <img alt='downarrow' className={(sortSelected === 'ticketPrice'?"sort-downarrow-visible": "sort-downarrow-hidden")} src={downarrow} />
                                        </p>
                                        <p>Low To High</p>
                                    </div>
                            </div>
                            <div className='sorting-options'>
                                    <input
                                    type='radio'
                                    value={1}
                                    name='duration'
                                    checked={sortSelected === 'duration'}
                                    onChange={handleSortChange}
                                    />
                                    <div>
                                        <p>Fastest
                                        <img alt='downarrow' className={(sortSelected === 'duration'?"sort-downarrow-visible": "sort-downarrow-hidden")} src={downarrow} />
                                        </p>
                                        <p>Shortest First</p>
                                    </div>
                            </div>
                            <div className='sorting-options'>
                                    <input
                                    type='radio'
                                    name='departureTime'
                                    value={1}
                                    checked={sortSelected === 'departureTime'}
                                    onChange={handleSortChange}
                                    />
                                    <div>
                                        <p>Departure
                                        <img alt='downarrow' className={(sortSelected === 'departureTime'?"sort-downarrow-visible": "sort-downarrow-hidden")} src={downarrow} />  
                                        </p>
                                        <p>Earliest First</p>
                                    </div>
                            </div>
                            <div className='sorting-options'>
                                    <input
                                    type='radio'
                                    value={1}
                                    name='arrivalTime'
                                    checked={sortSelected === 'arrivalTime'}
                                    onChange={handleSortChange}
                                    />
                                    <div>
                                        <p>Smart
                                        <img alt='downarrow' className={(sortSelected === 'arrivalTime'?"sort-downarrow-visible": "sort-downarrow-hidden")} src={downarrow} />
                                        </p>
                                        <p>Recommended</p>
                                    </div>
                            </div>
                        </div>
                     </div>
                     <div className='available-flights-container'>
                       {flight.map((flight,index)=>{
                           const {source,destination,departureTime,arrivalTime,duration,stops,ticketPrice,flightID} = flight;
                        //  if(source && destination && departureTime && arrivalTime && duration && stops && ticketPrice && flightID){
                             const id = flightID.slice(0, 2);
                             let airline;
                             let imgUrl;
                             if(id === "AI"){
                                 airline= "Air India";
                                 imgUrl = "https://images.ixigo.com/img/common-resources/airline-new/AI.png";
                             }else if(id === "6E"){
                                airline= "IndiGo";
                                imgUrl = "https://images.ixigo.com/img/common-resources/airline-new/6E.png";
                             }else if(id === "UK"){
                                airline= "Vistara";
                                imgUrl = "https://images.ixigo.com/img/common-resources/airline-new/UK.png";  
                             }else if(id === "SG"){
                                airline= "SpiceJet";
                                imgUrl = "https://images.ixigo.com/img/common-resources/airline-new/SG.png"
                             }else if(id === "G8"){
                                airline="Go First";
                                imgUrl = "https://images.ixigo.com/img/common-resources/airline-new/G8.png"
                             }else{
                                airline= "IndiGo";
                                imgUrl = "https://images.ixigo.com/img/common-resources/airline-new/6E.png";
                             }

                             return(
                                <div className='available-flights-card' key={index}>
                                <div className='source-destination-stops-price-book'>
                                   <div className='source-destination-stops'>
                                          <div className='img-and-airline'>  
                                             <img  src={imgUrl} alt='airline-img'/>
                                              <div>
                                                 <p>{airline}</p>
                                                 <p>{flightID}</p>
                                              </div>
                                          </div>
                                          <div className='source-stops-destiny' >
                                              <div>
                                                 <h5 className='time'>{departureTime}</h5>
                                                 <p className='source-destination'>{source}</p>
                                              </div>
                                              <div>
                                                 <p>{duration+" hours"}</p>
                                                 <div style={{height:"1px",width:"70px", borderBottom:"1px solid #d8d8da"}}></div>
                                                 <p>{(stops===0? "Non-stop": stops+" stops")}</p>


                                              </div>
                                              <div>
                                                 <h5 className='time'>{arrivalTime}</h5>
                                                 <p className='source-destination'>{destination}</p>
                                              </div>
                                          </div>
                                   </div>
                                   <div className='price-book'>
                                       <h5>{"₹"+ticketPrice}</h5>
                                       <button>Book</button>
                                   </div>
                                </div>
                                    <div className='more-details'>
                                        <div className={(id !== "AI"? 'hiddenHandbag':'')}>

                                            <div style={{height:"16px", width:"16px", overflow:"hidden"}}>
                                                <img alt='handbag' src={handbag}/>
                                            </div>
                                            <p>Handbag Only</p>
                                        </div>
                                        <p>Flight Details &gt;</p>
                                    </div>
                                </div>)
                            // }
                            // return null;
                       })}

                     </div>
                </div>

             </div>
        </div>
    

    </>
)
}

export default Search;