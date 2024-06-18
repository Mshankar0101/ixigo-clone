import React,{useState} from 'react'
import '../../styles/Train.css';
import Datepicker from '../../common/Datepicker';
import { AiOutlineSwap } from "react-icons/ai";

const Trains = () => {

  //date picker
  const [currentDate, setCurrentDate] = useState(new Date());







  return (
    <div className='train-home-page'>
      <div className='train-banner'>
         <img alt='banner' src='https://images.ixigo.com/image/upload/misc/f3c5fc0564afd3390b0d7fedfba8e8c2-qsbuo.webp'/>
         <div className='banner-line'>
             <img alt='train icon' src='	https://images.ixigo.com/rt-train/pc/img/trainsHome/compareBookWhite.png'/>
             <h1>Train Ticket Booking</h1>
         </div>
         <div className='train-search-box'>
            <div className='search-input-feilds'>
               
                <div className='train-search-feild-relative'>
                  <input type="text" className="inputTextTrain leftRoundBorder" required/>
                  <span className="floating-label-train">From</span>
                </div>

                <div className='train-search-feild-relative'>
                  <input type="text" className="inputTextTrain" required/>
                  <span className="floating-label-train">To</span>
                  <div className='swap-icon-div'>
                   <AiOutlineSwap className='swap-icon'/>
                  </div>
                </div>
               

                <div className='train-search-feild-container'>
                 <Datepicker currentDate={currentDate} setCurrentDate={setCurrentDate} />
                </div>

                <div className='train-search-feild-container'>
                  <button className='search-button'>Search</button>
                </div>
            </div> 

              <div className='description'>
                  <div>
                    <input type='checkbox'/>
                    <p>Get a full train fare refund</p>
                    <img alt='icon' src='https://www.ixigo.com/image/upload/fcRelated/8035f73dc62e7ed58a05b30805b4bf59-bhtst.gif'/>
                  </div>
                  <div>
                    <p>₹0 cancellation fee  &#x2022;  Instant full train fare refunds &#x2022; 24*7 premium customer support &#x2022; No documentation required</p>
                  </div>
              </div>
         </div>
      </div>
      <div className='train-cards-section'>
         
      </div>
    </div>
  )
}

export default Trains