import "../styles/App.css";
import React,{useState, useEffect} from "react";
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
import ScrollToTop from "./ScrollToTop";

function App() {
  const location = useLocation();
const [showNavbar, setShowNavbar]= useState(true);
useEffect(()=>{

  if(location.pathname==='/flights/search'){
    setShowNavbar(false);
  }else{
    setShowNavbar(true);
  }
},[location])
  return (
  <div className="App"> 
       <ScrollToTop/>
      <Header/>
      {showNavbar && <Navbar/>}
        <Routes>
            <Route path="/" element={<Flights/>} />
            <Route path="/flights/*" element={<Flights/>} />
            <Route path="/flights/search" element={<Search/>} />
            <Route path="/hotels" element={<Hotels/>} />
            <Route path="/trains" element={<Trains/>} />
            <Route path="/buses" element={<Buses/>} />
            <Route path='/login' element={<Login/>} />

            <Route path='*' element={<h2>Page Not Found</h2>} />
        </Routes>
  </div>
  );
}

export default App;
