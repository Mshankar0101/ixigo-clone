import React,{useState, useEffect, useContext} from 'react'
 import '../../styles/FlightSearch.css';
 import sunrise from '../../images/sunrise.png';
 import cloudy from '../../images/cloudy.png';
 import sun from '../../images/sun.png';
 import cloudynight from '../../images/cloudy-night.png';
 import {Slider} from '@mui/material';
 import FlightSearchContext from '../../context/Contexts'
import FlightSearchBox from './FlightSearchBox';

const Search = () => {

   //logic for filter
   const handleCheckboxNonstop = ()=>{

   }
   const handleCheckboxOnestop = ()=>{

   }
   const handleCheckboxTwoplusstop = ()=>{

   }

   //price range slider
   const [priceRange, setPriceRange] = useState([2000, 10000]);
    const updatePriceRange = (e, val)=>{
        setPriceRange(val);
        // console.log(val);
    }

    //retrieving seach feild data from context
    const {searchFeilds} = useContext(FlightSearchContext);
    
        if(searchFeilds === undefined){
            return <h1>No content</h1>
        }else{
            console.log("searchFeilds",searchFeilds);
            // const source = searchFeilds.value.split(" - ")[0];
            // const destination = searchFeilds.toValue.split(" - ")[0];
            // const date = searchFeilds.date.slice(0,3);
            // console.log(source,destination, date);
        }
    


  return (
    <>
        <FlightSearchBox/>
    
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
                                <p>Non-Stops</p> 
                                </div>
                                <div>
                                <input type="checkbox" name="non-stops" value="0" onChange={()=> handleCheckboxNonstop()} />
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

                </div>

             </div>
        </div>
    

    </>
)
}

export default Search