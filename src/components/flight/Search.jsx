import React,{useState, useEffect, useRef} from 'react'
import Datepicker from '../../common/Datepicker';
import { NavLink } from 'react-router-dom';
import Airports from './Airports';
import { Header } from '../Header'

const Search = () => {
    //dropdown container for popular airport and shearched airport
  const [showSuggesion, setShowSuggestions]= useState(false);
  const [value, setValue] = useState(``);
  const [toValue, setToValue] = useState(``);
  const [inputChange, setInputChange] = useState(false);
  const [fromSuggession, setFromSuggesion] = useState(false);
  const [toSuggession, setToSuggesion] = useState(false);
  const inputFromRef = useRef();
  const inputToRef = useRef();
  
  //handling input of from feild
    const handleInputChange = (e)=>{
        console.log("showSuggesion",showSuggesion);
        console.log("fromSuggession",fromSuggession);
        setValue(e.target.value);
        if(e.target.value !== ""){
            setInputChange(true);
        }else{
            setInputChange(false);
        }
    }

  //handling input of to feild
    const handleToInputChange = (e)=>{
        console.log("showSuggesion", showSuggesion);
        console.log("toSuggession",toSuggession);
        setToValue(e.target.value);
        if(e.target.value !== ""){
            setInputChange(true);
        }else{
            setInputChange(false);
        }
    }

    //input feild travellers and class logic
    const [travellersAndClass, setTravellersAndClass]= useState("2 Travellers, Economy");
    const [showTravellersdropdown, setShowTravellersDropdown]= useState(false);
    const travellerDropdown = useRef();
    const handleTravellersOutsideClik = (event)=>{
        if(travellerDropdown.current && !travellerDropdown.current.contains(event.target) ){
            setShowTravellersDropdown(false);
        }
    }
    useEffect(()=>{
        document.addEventListener("mousedown", handleTravellersOutsideClik);
        return ()=>{
            document.removeEventListener("mousedown", handleTravellersOutsideClik);
        }
        
    },[]);





  return (
    <>
        <Header/>
        <div className='flight-search-box'>

        <div className='flight-search-input'>
            <div className='flight-search-feild-relative'>
                <input type="text" className="inputText input-first-child" onFocus={()=> {
                    setShowSuggestions(true);
                    setFromSuggesion(true);
                    setToSuggesion(false);
                }}  value={value} onChange={handleInputChange} ref={inputFromRef} required></input>
                <span className="floating-label">From</span>  
                {
                    fromSuggession &&
                <Airports value={value} setValue={setValue} setShowSuggestions={setShowSuggestions}  showSuggesion={showSuggesion} inputChange={inputChange} fromSuggession={fromSuggession} inputFromRef={inputFromRef}/>
                }    
            </div>

            <div className='flight-search-feild-relative'>
            <input type="text" className="inputText" onFocus={()=>{ 
                setShowSuggestions(true);
                setToSuggesion(true);
                setFromSuggesion(false);
            }}  value={toValue} onChange={handleToInputChange} ref={inputToRef} required/>
            <span className="floating-label">To</span>
            {
                toSuggession &&
            <Airports toValue={toValue} setToValue={setToValue} setShowSuggestions={setShowSuggestions}  showSuggesion={showSuggesion} inputChange={inputChange} toSuggession={toSuggession} inputToRef={inputToRef}  />
            }

            </div>
                
            <div className='flight-search-feild-container'>
            <Datepicker/>
            </div>

            <div className='flight-search-feild-relative'>
                <input type="text" className="inputText" value={travellersAndClass} onFocus={()=>setShowTravellersDropdown(true)}  required/>  
                {/* onBlur={()=> setShowTravellersDropdown(false)} */}
                <span className="floating-label">Travellers & Class</span>
                {showTravellersdropdown && 
                
                    <div className="flight-travellers-class" ref={travellerDropdown}>
                        <h6>Travellers</h6>
                        <div className="flight-travellers-container">
                            <div className="flight-traveller">
                                <div>
                                    <p>Adults</p>
                                    <p>12 yrs or above</p>
                                </div>
                                <div className='adults'>
                                    <button>1</button>
                                    <button>2</button>
                                    <button>3</button>
                                    <button>4</button>
                                    <button>5</button>
                                    <button>6</button>
                                    <button>7</button>
                                    <button>8</button>
                                    <button>9</button>
                                </div>
                            </div>
                            <div className="flight-traveller">
                                <div>
                                    <p>Children</p>
                                    <p>2 - 12 yrs</p>
                                </div>
                                <div className='children'>
                                    <button>0</button>
                                    <button>1</button>
                                    <button>2</button>
                                    <button>3</button>
                                    <button>4</button>
                                    <button>5</button>
                                    <button>6</button>
                                    <button>7</button>
                                    <button>8</button>
                                </div>
                            </div>
                            <div className="flight-traveller">
                            <div>
                                    <p>Infant</p>
                                    <p>0 - 2 yrs</p>
                                </div>
                                <div className='infants'>
                                    <button>0</button>
                                    <button>1</button>
                                    <button>2</button>
                                    <button>3</button>
                                    <button>4</button>
                                </div>
                            </div>
                            {/* <div className="flight-travellers-more-than-nine">
                            </div> */}
                            <div className="flight-class-container">
                                <p className='class'>Class</p>
                                <div className="flight-class">
                                    <div className='flight-class-div'>
                                        <p>Economy</p>
                                    </div>
                                    <div className='flight-class-div'>
                                        <p>Premium Economy</p>
                                    </div>
                                    <div className='flight-class-div'>
                                        <p>Business</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                                <NavLink to='/search' >
                            <div className="flight-travellers-class-btn-container">
                                <button className="flight-travellers-sumbit-btn">
                                    Done
                                </button>
                            </div>
                                </NavLink>
                </div>}
            </div>
        
            <div className='flight-search-feild-container'>
            <button className='search-button'>Search</button>
            </div>
        </div>

        <div className='flight-passanger-category'>
            <div>
            <div className='special-fare'><b >Special Fares</b> (Optional) : </div>
            <div className='category-div'><p>Student</p> </div>
            <div className='category-div'><p>Senior Citizen</p> </div>
            <div className='category-div'><p>Armed Forces</p> </div>
            </div>
        </div>
        </div>

    <div>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
        <h1>hello</h1>
        
    </div>







    </>
)
}

export default Search