import React, { useEffect, useState, useRef } from 'react';
import { Header } from "../Header";
import Navbar from "../Navbar";
import Footer from "../Footer";
import '../../styles/Flight.css';
import flightDiscount from '../../images/flightAdvertisement.jpg';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Datepicker from '../../common/Datepicker';
import Airports from './Airports';
import { Link, NavLink } from 'react-router-dom';


const Flights = () => {

 //fething api for offers
 const [offer, setOffers] = useState([]);
 const fetchOffers = ()=>{
    fetch("https://academics.newtonschool.co/api/v1/bookingportals/offers?filter={\"type\":\"FLIGHTS\"}&&limit=30",{
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
    },[]);

//offer section next/prev
const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1210 }, //min:1024
      items: 4,
      slidesToSlide: 3
    },
    desktop: {
      breakpoint: { max: 1210, min: 910 }, //max:1024
      items: 3,
      slidesToSlide: 2
    },
    tablet: {
      breakpoint: { max: 910, min: 600 },
      items: 2,
      slidesToSlide: 1
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

  console.log("flight component");
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
    
    <div className='flight'>
        <Header/>
        <Navbar />
        <div className='flightPage-background' >
            <div className='search-book-go'>
                <div >
                <img alt='flightIcon' src="data:image/png;base64,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"/>                {/* <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAELElEQVR4nO2Xf2gbZRjHX38hFfEXCKKifyg4FXQogmjN6ZDKYLpcu7KJs0w76qBbdRPWpKNk2uVW0dmla93S5t63XZu8727KpM2tm5sUyywu184qjcn7xjIm1l/7Q3RuY9b2kUsXaZtLbNYFW7kPPJA3ee/u+33f53nuDUI2NjY2Nv8VLiXyhkuJ9Lm9kZ/dXuOc22sMm99t3NFfgBYCbm9EcinGebdiwLTwRkZdSuRlBHBFrvf0HRTXBkKx21VN3Gp+RvmmZlvkeZdijKWZUAyY3J3Bh7JdT7STt5FQvJIw8RFh/CfCBNTtOA7LX9oPVe6jE5WbPzm9dEXo5IvlHzdWVBy5MU8mjDK3NzJhbcIYcynGTo/nixtS81u14Vswi6/FTBzFlP9lip4am7f2waLHdkFRcRDebRqE8td7oN43AJMGE6WWIp4p6XlQkvWtkhyOOuRw95LS7jtyMeH2RiqtDKSipn7gRx+Ovk8Y78ZUXJgpmkyJPe3fwAbXp+Br+Sr9dyrOgFVqOmQ9JMk6pMIh6786nOEKhGafxy4lUjdN9PYBUHxDsEuNgkp5mpgPSBRaOmIZjVjEnyoTr1g+XFp+4CbJqZ+aaiJpxKkferK0667ZmtiyfcC3beeX4AsMgxpKF52K1o4YPFy4G5a80PGvwjHlE2aNqJp4IOvDpeLws5IcnphpQpL1sw45XI08niutrjO3FNPEE4TyZsLE6UxC1lTqsLSUJo1hykFevR9e3XAws3jKf8FUNBKNL57tAiKHU2+0MHBxN8LHpOKuRam5AS12H2b8bcLEiJWA95pPQMXGQ9DSOZkmz5UEYXHhHmjZmyVtqDiDqaAqFcv8/oFrUK48XqoVOJx6LJOJopU952sUg2Iqjl3c2mkC3mk68U++ryo/kOwmtfX9yXGgM54sUIsUOWcWdxvjZU3a8PVorjwldz0iOfULKdFPl+hQtv4zqGsYSm59ptWrfmuy/a1783By3Bj4GjbV9gK2qIVJ84nfMUus9XeNXocuN5Ks1xat7IH1W/qhmaSvmlU07B6CZav2gdJgzK6rUD6I8kEbFfeoId7cGoyP59Dicg8qyi+vcO3bRzHjewkVY3MVhxn/jTB+OMucUU37riAPBoQfM/HHpQnn42Zxt1FeYRYjpqI6i8HXUL4IBk/dTJgowZQ3YCqOm2eQ9I7DxzETPxDGPzdNE8rXtHSIO6feB1P+YQYDI5fUIueCp7f3atNYKsxxtvnmyy11upwZZrtE8512yu/PULhDmgZXofkO2SfWWRlQNSGhhQChImSx+iG0UMBUfD/jpXU20Bm9Gy0EWrXEvelHh/gmtFAgVJTPSJ0jHg9YHsXnJZiK9inidb82kp8/4/mCMNFHKFdVLV6Yt4fY2Nj8T1lRVQPzOZBtoMreAchrCtnY2NjYoBz4G8m4sZRoHbZmAAAAAElFTkSuQmCC"/> */}
                </div>
                <h2>Search &#x2022; Book &bull; Go</h2>
            </div>
           
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
                        {/* {(showSuggesion && inputChange)?

                            <div className='airport-suggesion-container' ref={autocompleteRef} >
                               
                                <ul>
                                { airports.map((item)=>{
                                        // const airportByCity = item.filter((item)=>item.city.toLowerCase()===value.toLowerCase());
                                        // airportByCity.map((item)={

                                        // })
                                        if(item.city.toLowerCase().includes(value.toLowerCase()) || item.name.toLowerCase().includes(value.toLowerCase())){

                                            return(
                                                <li key={item._id} onClick={()=> handelSuggetionClick(item)}>
                                                    <div className='iata_code_airport' >
                                                        <span>{item.iata_code}</span>
                                                    </div>
                                                    <div className='name_city_airport' >  
                                                        <p>{`${item.city}, ${item.country}`} </p>
                                                        <p>{item.name}</p>
                                                    </div>
                                                </li> 
                                            )
                                        }
                                        return null;
                                    })}
                                </ul>
                            </div> 
                            :
                            (showSuggesion && !inputChange)? 
                            
                            <div className='airport-suggesion-container' ref={autocompleteRef} >
                                <div className='popular-airports'>
                                    <p>Popular Airports</p>
                                </div>
                                <ul>
                                { popularAirports.map((item)=>{
                                        return(
                                            <li key={item._id} onClick={()=> handelSuggetionClick(item)}>
                                                <div className='iata_code_airport' >
                                                    <span>{item.iata_code}</span>
                                                </div>
                                                <div className='name_city_airport' >  
                                                    <p>{`${item.city}, ${item.country}`} </p>
                                                    <p>{item.name}</p>
                                                </div>
                                            </li> 
                                        )
                                    })}
                                </ul>
                            </div>
                            : null
                            } */}
                        

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
            
        </div>
            <div className='poster'>
                <img alt='flight offer' src={flightDiscount}/>
            </div>
        <div className='flight-offers'>
           <h2>Offers For You </h2> 
           <div className='flight-offers-container' >
                <Carousel  responsive={responsive}  >
                {offer.map((item)=>{
                    if(item.newHeroOfferCardUrl){
                    return <div className='flight-offer-img-container' key={item.id} >
                            <img alt={item.pTl} src={item.newHeroOfferCardUrl}/>
                        </div>
                    }else{
                        return null;
                    }
                })}
                </Carousel>

            {/* <div className='flight-offers-next-prev'>
                <div onClick={showPreviousOffers} >
                <img alt='previous-icon' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5UlEQVR4nO2ZOw7CQAxEHYr4qEhQ2DkBf0jLR1DA7exzsHRApCSIanckP8n9zHi1Hy9REATB/6SqVjuz+pzwSFUtdmH1xGpPMBPv5NOnDMXEd/LdqsVuVL54P/WL9zst0oTKJVWsfgQVT8TqbYjPAYsfkJPfh/gcsPgOOHnbhvgcsNoGN3mxdYjPAautkJNfwoofNaD2gDAwuoSgTMjADhQmSjnIoDqhA/egMFHKdRqrE97/GgsTpTzqwTrRhomiR4sKs5xGhrsKZQJ2vP7jg6PxGcF+MTVQ4juduLLYNLeSIAgoLy+9z15ZP/8kOAAAAABJRU5ErkJggg=="/>
                </div>

                <div onClick={showNextOffers}>
                <img alt='next-icon' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA6klEQVR4nO2ZSQoCMRBFvy46B1VwZ9UNdOvswgH1diYeQ0oUFBHtdf0yD3r/XkLoDEClUvlvkp77jZYjRtYFo3ySfE1arJFyoopIb/LP7zETsA4YaCTv3+VfEZI3JBHWuct+jyiHGuFhJpKUNf1MJC0rcGDBI6QswYEFj9C8AP9M5Dk4sPARMwRYE1NwED1C8gQBIsYgCdiSBlib/AS08up+EUeVF/c/slZ571uJqPLqfjttLSPv/kBjQeXV/aHegsqL+4st+ylPcD9qzPLgv15Pw0uP+oHjM4LuielJkjxoNO+oRr5SqcANNxV6UqzcpPJzAAAAAElFTkSuQmCC"/>
                </div>
            </div> */}
           </div>
        </div>
        <Footer/>
    </div>
    
  )
}

export default Flights