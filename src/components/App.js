import "../styles/App.css";
import React,{useState, useEffect, useContext} from "react";
// import Search from "./flight/Search";
import { Routes, Route, useLocation} from "react-router-dom";
import Flights from "./flight/Flights";
import Search from "./flight/Search";
import Hotels from "./hotel/Hotels";
import Trains from "./train/Trains";
import Buses from "./bus/Buses";
import Login from "./Login";
import Navbar from "./Navbar";
import { Header } from "./Header";
// import ScrollToTop from "./ScrollToTop";
import FlightSearchContextProvider from "../context/FlightSearchContextProvider";
import PageNotFound from "./PageNotFound";
import GlobalContext from '../context/Contexts';
import FlightBooking from "./flight/FlightBooking";
import NavbarMobile from "./NavbarMobile";

function App() {
const location = useLocation();
const [showNavbar, setShowNavbar]= useState(true);
useEffect(()=>{

  if(location.pathname==='/flights/search'){
    setShowNavbar(false);
  }else{
    setShowNavbar(true);
  }
},[location]);



const {resolution,setResolution} = useContext(GlobalContext);

useEffect(()=>{
  console.log(resolution);
},[resolution]);

useEffect(() => {
  const handleResize = () => {
    setResolution({ width: window.innerWidth, height: window.innerHeight });
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);



  return (
  <div className="App"> 
   <FlightSearchContextProvider>
        {resolution.width < 766?
          <NavbarMobile/>
          :
          <>
            <Header/>
            {showNavbar && <Navbar/>}
          </>
        }
          <Routes>
              <Route path="/" element={<Flights/>} />
              <Route path="/nav" element={<NavbarMobile/>} />
              <Route path="/flights/*" element={<Flights/>} />
              <Route path="/flights/search/*" element={<Search/>} />
              <Route path="/flights/search/book" element={<FlightBooking/>} />
              <Route path="/hotels" element={<Hotels/>} />
              <Route path="/trains" element={<Trains/>} />
              <Route path="/buses" element={<Buses/>} />
              <Route path='/login' element={<Login/>} />

              <Route path='*' element={<PageNotFound/>} />
          </Routes>
     
       
    </FlightSearchContextProvider>
  </div>
  );
}

export default App;
