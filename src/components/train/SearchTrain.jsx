import React,{useState,useEffect, useRef} from 'react'
import '../../styles/Train.css';
import '../../styles/SearchTrain.css';
import Datepicker from '../../common/Datepicker';
import { AiOutlineSwap } from "react-icons/ai";
import { MdOutlineLocationCity } from "react-icons/md";
import { useLocation } from 'react-router-dom';

const SearchTrain = () => {
  const location = useLocation();
  const [filterObj, setFilterObj]= useState({});

  //date picker
  const [currentDate, setCurrentDate] = useState(new Date());

  //dropdown container for search feilds
  const [showSuggetion, setShowSuggetions]= useState(false);
  const [fromSuggession, setFromSuggesion] = useState(false);
  const [toSuggession, setToSuggesion] = useState(false);
  const [inputChange, setInputChange]=useState(false);
  const [inputValue, setInptValue] = useState('');
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const inputFromRef = useRef();
  const inputToRef = useRef();
  const autocompleteRef = useRef();


   //handling outside click for to and from dropdown
   const handleClickOutside = (event)=>{
    // console.log("input from", inputFromRef?.current.contains(event.target))
    // console.log("input to", inputToRef?.current.contains(event.target))
    if(autocompleteRef.current && !autocompleteRef.current.contains(event.target) && inputFromRef?.current && !inputFromRef?.current.contains(event.target) && !inputToRef?.current.contains(event.target) ){
      setShowSuggetions(false);
      console.log("inside from con");
    }
    else if(autocompleteRef.current && !autocompleteRef.current.contains(event.target) && inputToRef?.current && !inputToRef?.current.contains(event.target) && !inputFromRef?.current.contains(event.target)){
      setShowSuggetions(false);
      console.log("inside to con");
    }
   }
  useEffect(()=>{
      document.addEventListener("mousedown", handleClickOutside);
      return ()=>{
          document.removeEventListener("mousedown", handleClickOutside);
      }
      
  },[]);


  //input change and station rendering
  const stationsArr= [
    {id:1, name:"Agra Cantonment"},
    {id:2, name:"Ahmedabad Junction"},
    {id:3, name:"Ambala Cantonment"},
    {id:4, name:"Amritsar Junction"},
    {id:5, name:"Anand Junction"},
    {id:6, name:"Barddhaman Junction"},
    {id:7, name:"Bengaluru City Junction"},
    {id:8, name:"Chandigarh"},
    {id:9, name:"Chennai Central"},
    {id:10, name:"Coimbatore Junction"},
    {id:11, name:"Delhi Junction"},
    {id:12, name:"Dhanbad Junction"},
    {id:13, name:"Gorakhpur Junction"},
    {id:14, name:"Guwahati"},
    {id:15, name:"Hazrat Nizamuddin"},
    {id:16, name:"Howrah Junction"},
    {id:17, name:"Hubli Junction"},
    {id:18, name:"Indore Junction"},
    {id:19, name:"Kalyan Junction"},
    {id:20, name:"Kanpur Central"},
    {id:21, name:"Katpadi Junction"},
    {id:22, name:"Kharagpur Junction"},
    {id:23, name:"Kollam Junction"},
    {id:24, name:"Lucknow Charbhagh"},
    {id:25, name:"Ludhiana Junction"},
    {id:26, name:"Manmad Junction"},
    {id:27, name:"Moradabad Junction"},
    {id:28, name:"Mughal Sarai Junction"},
    {id:29, name:"Mysuru Junction"},
    {id:30, name:"Nadiad Junction"},
    {id:31, name:"Nagpur Junction"},
    {id:32, name:"Patna Junction"},
    {id:33, name:"Pune Junction"},
    {id:34, name:"Raipur Junction"},
    {id:35, name:"Salem Junction"},
    {id:36, name:"Secunderabad Junction"},
    {id:37, name:"Surat"},
    {id:38, name:"Thiruvananthapuram Central"},
    {id:39, name:"Thrissur"},
    {id:40, name:"Udaipur City"},
    {id:41, name:"Vadodara Junction"},
    {id:42, name:"Varanasi Junction"},
    {id:43, name:"Vellore Katpadi"},
    {id:44, name:"Vijayawada Junction"},
    {id:45, name:"Visakhapatnam Junction"},
    {id:46, name:"Warangal"}
  ] 
  const handleInputChange = (e)=>{
    setInptValue(e.target.value);
     if(e.target.value !== ""){
      setInputChange(true);
     }else{
      setInputChange(false);
     }
  }

  // handling station click
  const handelSuggetionClick = (name)=>{
    console.log("from suggetion",fromSuggession );
    console.log("toSuggession",toSuggession );
    // console.log("value", name);
     if(fromSuggession){
      setFromValue(name);

     }
     if(toSuggession){
      setToValue(name);
     }
     setShowSuggetions(false)
  }
  useEffect(()=>{
     console.log("toValue",toValue)
     console.log("fromValue",fromValue)
  },[toValue,fromValue])


  //filter logic
  const handleClassChange = (e)=>{
    // const {value}= e.target;
  }
  const handleQuotaChange = ()=>{

  }

  const [departureTime, setDepartureTime]= useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const handleArrivalTime = (value)=>{
    setArrivalTime(value);
    console.log("value",value);
   
  }
  const handleDepartureTime = (value)=>{
    setDepartureTime(value);
    console.log(value);

  }

  return (
    <>
  <div className='train-search-page'>
        <div className='train-search-box-searchPage'>
            <div className='search-input-feilds'>
               
                <div className='train-search-feild-relative'>
                  <input type="text" className="inputTextTrain leftRoundBorder" ref={inputFromRef} onFocus={()=> {
                    setShowSuggetions(true);
                    setFromSuggesion(true);
                    setToSuggesion(false);
                  }}
                  onChange={handleInputChange}
                  value={fromValue}
                  required/>
                  <span className="floating-label-train">From</span>
                  {(fromSuggession && showSuggetion && inputChange)?
                    <div className='station-dropdown-container' ref={autocompleteRef}>
                      <ul>
                            {
                              stationsArr.map((station)=>{
                                if(station.name.toLowerCase().includes(inputValue?.toLowerCase())){
                                  return(
                                    <li key={station.id} value={station.name} onClick={()=>handelSuggetionClick(station.name)}>
                                      <div className="cityIcon">
                                        <MdOutlineLocationCity/>
                                      </div>
                                      <div className="name">
                                        <p>{station.name}</p>
                                      </div>
                                    </li>
                             
                                  )
                                }
                                return null;
                              })
                            }       
                        </ul>
                    </div>
                    : 
                    (fromSuggession && showSuggetion && !inputChange)?
                    <div className='station-dropdown-container' ref={autocompleteRef}>
                        <div className='popular-airports'>
                             <p>Popular Airports</p>
                        </div>
                        <ul>
                          { stationsArr.map((station)=>{
                            return(
                             <li key={station.id} value={station.name} onClick={()=>handelSuggetionClick(station.name)}>
                              <div className="cityIcon">
                                <MdOutlineLocationCity/>
                              </div>
                              <div className="name">
                                <p>{station.name}</p>
                              </div>
                             </li>
                            )
                          })
                            
                          }
                        </ul>
                    </div>
                    :
                    null
                    }
                </div>

                <div className='train-search-feild-relative'>
                  <input type="text" className="inputTextTrain" ref={inputToRef} onFocus={()=>{
                    setToSuggesion(true);
                    setShowSuggetions(true);
                    setFromSuggesion(false);
                  }}
                  onChange={handleInputChange}
                  value={toValue}
                  required/>
                  <span className="floating-label-train">To</span>
                  <div className='swap-icon-div'>
                   <AiOutlineSwap className='swap-icon'/>
                  </div>
                  {(toSuggession && showSuggetion && inputChange)?
                    <div className='station-dropdown-container' ref={autocompleteRef}>
                       <ul>
                            {
                              stationsArr.map((station)=>{
                                if(station.name.toLowerCase().includes(inputValue?.toLowerCase())){
                                  return(
                                    <li key={station.id} value={station.name} onClick={()=>handelSuggetionClick(station.name)}>
                                      <div className="cityIcon">
                                      <MdOutlineLocationCity/>
                                      </div>
                                      <div className="name">
                                        <p>{station.name}</p>
                                      </div>
                                    </li>
                             
                                  )
                                }
                                return null;
                              })
                            }       
                        </ul>
                    </div>
                    : 
                    (toSuggession && showSuggetion && !inputChange)?
                    <div className='station-dropdown-container' ref={autocompleteRef}>
                        <div className='popular-stations'>
                          <p>Popular Stations</p>
                        </div>
                        <ul>
                          { stationsArr.map((station)=>{
                            return(
                              <li key={station.id} value={station.name} onClick={()=>handelSuggetionClick(station.name)}>
                              <div className="cityIcon">
                                <MdOutlineLocationCity/>
                              </div>
                              <div className="name">
                                <p>{station.name}</p>
                              </div>
                             </li>
                            )
                          })
                            
                          }
                        </ul>
                    </div>
                    :
                    null
                    }
                </div>
               

                <div className='train-search-feild-container'>
                 <Datepicker  currentDate={currentDate} setCurrentDate={setCurrentDate} />
                </div>

                <div className='train-search-feild-container'>
                  <button className='search-button'>Search</button>
                </div>
            </div> 
           </div>
           <div className='train-filters'>
               <div className="train-class">
                 <p>Class</p>
                 <div className="checkbox-list">
                    <div>
                        <div>
                            <input type='checkbox' value="SL" onChange={handleClassChange}/>
                            <label>SL</label>
                        </div>
                        <div>
                            <input type='checkbox' value="2A" onChange={handleClassChange} />
                            <label>2A</label>
                        </div>
                        <div>
                            <input type='checkbox'value="3E" onChange={handleClassChange} />
                            <label>3E</label>
                        </div>
                    </div>
                    <div>
                        <div>
                            <input type='checkbox' value="3A" onChange={handleClassChange} />
                            <label>3A</label>
                        </div>
                        <div>
                            <input type='checkbox' value="1A" onChange={handleClassChange} />
                            <label>1A</label>
                        </div>
                        <div>
                            <input type='checkbox'value="2S" onChange={handleClassChange} />
                            <label>2S</label>
                        </div>
                    </div>
                 </div>
               </div>
                <div className="train-quota">
                   <p>Quota</p>
                   <div className='quota-list'>
                        <div>
                            <div>
                                <input type='radio' value='General' onChange={handleQuotaChange}/>
                                <label>General</label>
                            </div>
                            <div>
                                <input type='radio' value='Lower Berth' onChange={handleQuotaChange}/>
                                <label>Lower Berth</label>
                            </div>
                        </div>  
                        <div>
                            <div>
                                <input type='radio' value='Tatkal' onChange={handleQuotaChange}/>
                                <label>Tatkal</label>
                            </div>
                            <div>
                                <input type='radio' value='Ladies' onChange={handleQuotaChange}/>
                                <label>Ladies</label>
                            </div>
                        </div>  
                   </div>
                </div>
                <div className="train-time">
                    <div>
                        <p>Departure From</p>
                        <div className='time-list'>
                            <div>
                                <div className={departureTime === "12:00 - 06:00"? "arrivalStyle": ""}><p onClick={()=> handleDepartureTime("12:00 - 06:00")}>00:00 - 06:00</p></div>
                                <p>Early Morning</p>
                            </div>
                            <div>
                                <div className={departureTime === "06:00 - 12:00"? "arrivalStyle": ""}><p onClick={()=> handleDepartureTime("06:00 - 12:00")}>06:00 - 12:00</p></div>
                                <p>Morning</p>
                            </div>
                            <div>
                                <div className={departureTime === "12:00 - 18:00"? "arrivalStyle": ""}><p onClick={()=> handleDepartureTime("12:00 - 18:00")}>12:00 - 18:00</p></div>
                                <p>Mid Day</p>
                            </div>
                            <div>
                                <div className={departureTime === "18:00 - 24:00"? "arrivalStyle": ""}><p onClick={()=> handleDepartureTime("18:00 - 24:00")}>18:00 - 24:00</p></div>
                                <p>Night</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>Arrival at</p>
                        <div className='time-list'>
                            <div>
                                <div  className={arrivalTime === "12:00 - 06:00"? "arrivalStyle": ""} ><p onClick={()=> handleArrivalTime("12:00 - 06:00")} >00:00 - 06:00</p></div>
                                <p>Early Morning</p>
                            </div>
                            <div>
                                <div className={arrivalTime === "06:00 - 12:00"? "arrivalStyle": ""}><p onClick={()=> handleArrivalTime("06:00 - 12:00")}>06:00 - 12:00</p></div>
                                <p>Morning</p>
                            </div>
                            <div>
                                <div className={arrivalTime === "12:00 - 18:00"? "arrivalStyle": ""}><p onClick={()=> handleArrivalTime("12:00 - 18:00")}>12:00 - 18:00</p></div>
                                <p>Mid Day</p>
                            </div>
                            <div>
                                <div className={arrivalTime === "18:00 - 24:00"? "arrivalStyle": ""}><p onClick={()=> handleArrivalTime("18:00 - 24:00")}>18:00 - 24:00</p></div>
                                <p>Night</p>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
           
           <div className="train-sort-container">
            
           </div>

      </div>
    </>
  )
}

export default SearchTrain