import "../styles/App.css";
import React from "react";
// import Search from "./flight/Search";
import { Routes, Route } from "react-router-dom";
import Flights from "./flight/Flights";
import Search from "./flight/Search";
import Hotels from "./hotel/Hotels";
import Trains from "./train/Trains";
import Buses from "./bus/Buses";
import Login from "./Login";
import Navbar from "./Navbar";

function App() {
  return (
  <div className="App"> 
      {/* <Flights/> */}
      {/* <Search/> */}
      <Navbar/>
      <Routes>
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
