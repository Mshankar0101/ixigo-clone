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

   //logic for filter
   const [oneStop, setOneStop]=useState({stop:1,checked:false});
   const [twoStop, setTwoStop]=useState({stop:2,checked:false});
   const [nonStop, setNonStop]=useState({stop:0,checked:false});
   const handleCheckboxNonstop = ()=>{
        setNonStop({stop:0,checked:!nonStop.checked});
   }
   const handleCheckboxOnestop = (e)=>{
         setOneStop({stop:1,checked:!oneStop.checked});
   }
   const handleCheckboxTwoplusstop = (e)=>{
         setTwoStop({stop:2,checked:!twoStop.checked});
   }
  
//    useEffect(()=>{
//      const arr = [1,0,1,1,4,2,2,3,1,0]
//      console.log(oneStop.checked,twoStop.checked,nonStop.checked);
//      if(oneStop.checked || twoStop.checked || nonStop.checked){
//          var newArr = arr.filter((flight)=>{
//              if(flight.stops === oneStop.checked?1 || flight.stops === twoStop.checked?2 ||  flight.stops === nonStop.checked?0){

//              }

//          })
//      }
//    },[oneStop, twoStop, nonStop])
  
  
   

   //price range slider
   const [priceRange, setPriceRange] = useState([2000, 10000]);
    const updatePriceRange = (e, val)=>{
        setPriceRange(val);
        // console.log(val);
    }

    //sorting of flights
    const [sortSelectedOption, setSortSelectedOption]= useState('');
    const handleSortChange = (e)=>{
        setSortSelectedOption(e.target.value);
    }




    //retrieving seach feild data from context
    const {searchFeilds} = useContext(FlightSearchContext);
    const {value, toValue, date} = searchFeilds;
    const daysArr = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const source = value.split(" - ")[0];
    const destination = toValue.split(" - ")[0];
    const day = daysArr[date.getDay()];

    //display flight
   const [flight, setFlight] = useState([])
      const fetchFlights = (source,destination,day)=>{
           fetch(`https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${source}","destination":"${destination}"}&day=${day}`, {
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


     //rendering flight when nevigated from flight page
    //  useEffect(()=>{
    //     console.log(source,destination, day);
    //     fetchFlights(source, destination, day);
    //  },[]);


    //hadling searches on search page
    const handleSubmition = ()=>{
        console.log("inside handle submition");
        if(value && toValue && date){ 
            console.log(source,destination, day);
            fetchFlights(source, destination, day);   
        }
    }
    useEffect(()=>{
        console.log("useeffect");
        handleSubmition();
    },[searchFeilds]);




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
                                <input type="checkbox" name="non-stop" value="0" onChange={()=> handleCheckboxNonstop()} />
                                </div>
                            </li>
                            <li>
                                <div>
                                <p>1 Stop</p> 
                                </div>
                                <div>
                                <input type="checkbox" name="one-stop" value="1" onChange={()=> handleCheckboxOnestop()} />
                                </div>
                            </li>
                            <li>
                                <div>
                                <p>2+ Stops</p> 
                                </div>
                                <div>
                                <input type="checkbox" name="twoplus-stops" value="2" onChange={()=> handleCheckboxTwoplusstop()} />
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
                                <p className='departure'>Departure from Mumbai</p>
                                <div className='morning-day-night'>
                                    <div className='icon-div'>
                                        
                                    
                                        {/* <img alt='early morning' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABjklEQVR4nO2WTStEURjHf2aMREzIS7HwGWRh4yMQijIlNVufZHbyASxY2tkqKa81hYVBSDa2MlgNoaP/rWvSNDP3uvPS86uzmXOel/+c53nOBcMwDOM3rUCCJuAQuKIJKABfzXArBRNSZ9TdjfQDnREKaQP6CJkOIA/cAiMRCBkCLoBnoIsQiQMHSuiuQjHbwE6FIi4VK6t3KFS6gWMFeABGww4ADOgmXIyz/yitKMREJsIjCZwo4E0ZAyCm0ixFu0/EKdBLRCTVM2/AYNGeq+kpYF1J5XXuHNgAZv5o/B6dy0YpwiOuUvPjBFzrn/XWB/Be9JsbGHNFtm46hd7YldICZIBPJXoELGu6xbQ/DCwB+z5Bq9qvGzJK7AVIlXF+Xm+Es1mjTphWQq/ARAV2Y+oLZ7tAjUloDLtk0lXYp2T7qMlVM2Z9c9/1QTV479IiNWRTSawE8JGWj62gycQ0x6tZOSUxGcDHuHzcB/DxM7a9D7RGXjknZBd4avC1F7QsDcMwDMMwDMMwDMMwKMU30FLCeXRdQ/sAAAAASUVORK5CYII="/> */}
                                        <img alt='sunrise' src={sunrise}/>
                                        <p>Early Morning</p>
                                        <p>Before 6AM</p>
                                    </div>
                                    <div className='icon-div'>
                                        <img alt='morning' src={sun} />
                                        <p>Morning</p>
                                        <p>6AM-12PM</p>
                                    </div>
                                </div>
                                <div className='morning-day-night'>
                                <div className='icon-div'>
                                    <img alt='midday' src={cloudy} />
                                        <p>Mid Day</p>
                                        <p>12PM-6PM</p>
                                    </div>
                                    <div className='icon-div'>
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
                                <input type='checkbox'/>
                           </li>
                           <li>
                                <div>
                                    <img alt='indigo' src='https://images.ixigo.com/img/common-resources/airline-new/6E.png' />
                                </div>
                                <p>Indigo</p>
                                <input type='checkbox'/>
                           </li>
                           <li>
                                <div>
                                    <img alt='spicejet' src='https://images.ixigo.com/img/common-resources/airline-new/SG.png' />
                                </div>
                                <p>SpiceJet</p>
                                <input type='checkbox'/>
                           </li>
                           <li>
                                <div>
                                    <img alt='vistara' src='https://images.ixigo.com/img/common-resources/airline-new/UK.png' />
                                </div>
                                <p>Vistara</p>
                                <input type='checkbox'/>
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
                                    value='price'
                                    checked={sortSelectedOption === 'price'}
                                    onChange={handleSortChange}
                                    />
                                    <div>
                                        <p>Price
                                         <img alt='downarrow' className={(sortSelectedOption==='price'?"sort-downarrow-visible": "sort-downarrow-hidden")} src={downarrow} />
                                        </p>
                                        <p>Low To High</p>
                                    </div>
                            </div>
                            <div className='sorting-options'>
                                    <input
                                    type='radio'
                                    value='fastest'
                                    checked={sortSelectedOption === 'fastest'}
                                    onChange={handleSortChange}
                                    />
                                    <div>
                                        <p>Fastest
                                        <img alt='downarrow' className={(sortSelectedOption==='fastest'?"sort-downarrow-visible": "sort-downarrow-hidden")} src={downarrow} />
                                        </p>
                                        <p>Shortest First</p>
                                    </div>
                            </div>
                            <div className='sorting-options'>
                                    <input
                                    type='radio'
                                    value='departure'
                                    checked={sortSelectedOption === 'departure'}
                                    onChange={handleSortChange}
                                    />
                                    <div>
                                        <p>Departure
                                        <img alt='downarrow' className={(sortSelectedOption==='departure'?"sort-downarrow-visible": "sort-downarrow-hidden")} src={downarrow} />  
                                        </p>
                                        <p>Earliest First</p>
                                    </div>
                            </div>
                            <div className='sorting-options'>
                                    <input
                                    type='radio'
                                    value='smart'
                                    checked={sortSelectedOption === 'smart'}
                                    onChange={handleSortChange}
                                    />
                                    <div>
                                        <p>Smart
                                        <img alt='downarrow' className={(sortSelectedOption==='smart'?"sort-downarrow-visible": "sort-downarrow-hidden")} src={downarrow} />
                                        </p>
                                        <p>Recommended</p>
                                    </div>
                            </div>
                        </div>
                     </div>
                     <div className='available-flights-container'>
                       { flight.map((flight)=>{
                           const {source,destination,departureTime,arrivalTime,duration,stops,ticketPrice,flightID} = flight;
                          if(source && destination && departureTime && arrivalTime && duration && stops && ticketPrice && flightID){
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
                                <div className='available-flights-card'>
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
                                        <div>
                                            <div style={{height:"16px", width:"16px", overflow:"hidden"}}>
                                                <img alt='handbag' src={handbag}/>
                                            </div>
                                            <p>Handbag Only</p>
                                        </div>
                                        <p>Flight Details &gt;</p>
                                    </div>
                                </div>)
                            }
                            return null;
                       })}

                     </div>
                </div>

             </div>
        </div>
    

    </>
)
}

export default Search;