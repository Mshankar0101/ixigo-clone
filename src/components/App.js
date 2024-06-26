import "../styles/App.css";
import React,{useState, useEffect, useContext} from "react";
import { Routes, Route, useLocation} from "react-router-dom";
import Flights from "./flight/Flights";
import Search from "./flight/Search";
import Hotels from "./hotel/Hotels";
import Trains from "./train/Trains";
import Buses from "./bus/Buses";
import Login from "./Login";
import Navbar from "./Navbar";
import { Header } from "./Header";
import FlightSearchContextProvider from "../context/FlightSearchContextProvider";
import PageNotFound from "./PageNotFound";
import GlobalContext from '../context/Contexts';
import BookingPage from "./common/BookingPage"
import NavbarMobile from "./NavbarMobile";
import SearchTrain from "./train/SearchTrain";
import SearchBus from "./bus/SearchBus";

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


//updated innerwiwdth of window for navbar responsiveness
const {resolution} = useContext(GlobalContext);
// useEffect(()=>{
//   console.log(resolution);
// },[resolution]); 


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
              <Route path="/search" element={<Flights/>} />
              <Route path="/nav" element={<NavbarMobile/>} />

              <Route path="/flights/*" element={<Flights/>} />
              <Route path="/flights/search/*" element={<Search/>} />
              <Route path="/flights/search/book" element={<BookingPage/>} />

              <Route path="/hotels" element={<Hotels/>} />

              <Route path="/trains/*" element={<Trains/>} />
              <Route path="/trains/search/*" element={<SearchTrain/>} />
              <Route path="/trains/search/book" element={<BookingPage/>} />

              <Route path="/buses/*" element={<Buses/>} />
              <Route path="/buses/search/*" element={<SearchBus/>} />

              <Route path='/login' element={<Login/>} />
              <Route path='*' element={<PageNotFound/>} />
          </Routes>
     
       
    </FlightSearchContextProvider>
  </div>
  );
}

export default App;
