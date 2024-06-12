import React, { useEffect, useState } from 'react'
import { Box, Stack, TextField, Alert, styled, Button, Typography} from '@mui/material';
import '../../styles/FlightBooking.css';
import {useLocation} from 'react-router-dom';

const FlightBooking = () => {
    const location = useLocation();
    const {ticketPrice,totalTravlers} = location.state || {};

    //const [data, setData]= useState({});
    console.log(totalTravlers, ticketPrice);
    // if(totalTravlers && ticketPrice){
    //     setData({ticketPrice,totalTravlers});
    // }
    // useEffect(()=>{
    //     console.log("totalTravlers", data.totalTravlers);
    //     console.log("ticketPrice", data.ticketPrice);
    // },[data]);


    const [selectedOption,setSelectedOption]= useState(150);
    const selectedOfferChange = (e)=>{
        const {value}= e.target;
        setSelectedOption(Number(value));
    }

    //button
    const CustomButton = styled(Button)(({ theme }) => ({
        textTransform:'none',
        borderRadius:'10px',
        backgroundColor: 'rgb(252,121,13)',
        '&:hover': {
        backgroundColor: '#e36802',
        },
    }));

  return (
    <>
      <Stack 
       direction={{ xs: 'column', sm: 'column', md:'row', lg:'row' }}
       spacing={{sm:2,md:2}}
       sx={{backgroundColor:'rgba(239,239,240,1)'}}
      >
        <Stack 
         sx={{
            
            minWidth:'350px',
            maxWidth:'550px'
         }}
        >
            <Box
            sx={{
                marginTop:'20px',
                backgroundColor:'white',
                padding:'20px',
                borderRadius: '20px',
                boxShadow:'0px 2px 5px 0px rgba(0,0,0,.2)',
                overflow:'hidden'
            }}
            >
                <div className='offer-on-booking-flight-heading' >
                    <h3>Offers For You</h3>
                        <p>All Offers</p>
                </div>
               <div className='offer-on-booking-flight'>
                    <div className='input-div-offer'>
                        <input
                            type='radio'
                            value={150}
                            checked={selectedOption === 150}
                            onChange={selectedOfferChange}
                        /> 
                        <div className='coupen-price'>
                            <p>INSTANT</p>
                            <p>₹150 Off</p>
                        </div>
                    </div>
                    <div className='offer-description' style={{marginLeft:'25px'}}>
                        <p>Coupon applied. You will get an instant discount of ₹150</p>
                        <a href='/' >Know More</a>
                    </div>
               </div>
               <div className='offer-on-booking-flight'>
                    <div className='input-div-offer'>
                        <input
                            type='radio'
                            value={300}
                            checked={selectedOption === 300}
                            onChange={selectedOfferChange}
                        /> 
                        <div className='coupen-price'>
                            <p>IXIAUEMID</p>
                            <p>₹300 Off</p>
                        </div>
                    </div>
                    <div className='offer-description' style={{marginLeft:'25px'}}>
                        <p>Get an instant discount of ₹300 with AU Bank Credit Card EMI Payments.</p>
                        <a href='/' >Know More</a>
                    </div>
               </div>
               <div className='offer-on-booking-flight'>
                    <div className='input-div-offer'>
                        <input
                            type='radio'
                            value={250}
                            checked={selectedOption === 250}
                            onChange={selectedOfferChange}
                        /> 
                        <div className='coupen-price'>
                            <p>IXIONEEMI</p>
                            <p>₹250 Off</p>
                        </div>
                    </div>
                    <div className='offer-description' style={{marginLeft:'25px'}}>
                        <p>Get an instant discount of ₹250 with OneCard Credit Card EMI</p>
                        <a href='/' >Know More</a>
                    </div>
               </div>
            </Box>
            <Box 
             className='fare-summary-flight'
             sx={{
                marginTop:'20px',
                backgroundColor:'white',
                padding:'20px',
                borderRadius: '20px',
                boxShadow:'0px 2px 5px 0px rgba(0,0,0,.2)',
                overflow:'hidden',
                color:'#17181C'
            }}
            >
                <div className="flex-fare">
                  <h3>Fare Summary</h3>
                  <p style={{color:'#5E616E',fontSize:'14px'}}>{`${totalTravlers} travellers`}</p> 
                </div>
                <div className="flex-fare">
                    <p>Fare Type</p>
                    <p style={{color:'#238C46'}}>Partially Refundable</p>
                </div>
                <div className="flex-fare">
                    <p>Base Fare</p>
                    <p>{`₹${ticketPrice}`}</p>
                </div>
                <div className="flex-fare">
                    <p>Taxes & Fees</p>
                    <p>{`₹${ticketPrice*(1/20)}`}</p>
                </div>
                <div style={{borderBottom:'1px solid rgba(239,239,240)',marginTop:'10px'}}></div>
                <div className="flex-fare">
                    <p>Instant Off</p>
                    <p style={{color:'#238C46'}} >{`-₹${selectedOption}`}</p>
                </div>
                <div style={{borderBottom:'1px solid rgba(239,239,240)',marginTop:'10px'}}></div>
                <div className="flex-fare">
                    <h3>Total Amount</h3>
                    <h3>{`₹${ticketPrice+(ticketPrice*(1/20))-selectedOption}`}</h3>
                </div>
            </Box>
            <Box
             className='rules-privacy-policy'

             >
                <p>By clicking on continue, I confirm that I have read, understood, and agree with the <a href='/'>Fare Rules</a>, <a href='/'>Privacy Policy</a> and <a href='/'>Terms of Use</a>.</p>
                <p style={{color:'#848794'}}><strong >100%</strong> Safe Payment Process</p>
            </Box>
        </Stack>

        <Stack
          sx={{
            minWidth:'350px'
          }}
        >
            <Box 
             sx={{
                marginTop:'20px',
                backgroundColor:'white',
                padding:'20px',
                borderRadius: '20px',
                boxShadow:'0px 2px 5px 0px rgba(0,0,0,.2)',
                overflow:'hidden',
             }}
            >
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'10px'}}>
                   <h3 style={{margin:'0px',fontSize:'20px', fontWeight:'700',lineHeight:'1.2'}}>Traveller Details</h3>
                   <p style={{margin:'0px',color:'#5E616E',fontSize:'14px', fontWeight:'500',lineHeight:'1.4'}}>{`${totalTravlers} travellers`}</p>
                </div>
                <Alert severity="warning"  
                  sx={{
                    //  marginBottom:'15px',
                     fontSize:'small',
                     borderRadius:'15px',
                     ".MuiAlert-message":{
                        padding:'0px',
                        marginTop:'8px'
                     }
                   }}
                >
                  Please ensure that your name matches your govt. ID such as Aadhaar, Passport or Driver's License
                </Alert>
                
                <Stack
                   direction={{ xs: 'column', sm: 'column', md:'column', lg:'row' }}
                   spacing={{sm:2.5,md:2.5}}
                  sx={{
                    display:'flex',
                    alignItems:"flex-start",
                    justifyContent:'space-between',
                    padding:'20px',
                    gap:'10px'
                  }}
                >
                    <TextField
                     size='small'
                        //  sx={{
                        //     height:'40px',
                        //     width:'200px'
                        //  }}
                     type='text'
                     required
                     label="First & Middle Name"
                    />
                    <TextField
                      size='small'
                      label="Last Name"
                      type='text'
                      required
                    />
                    <TextField
                      size='small'
                      label="Nationality"
                      type='text'
                      required
                    />
                </Stack>
            </Box>
            <Box
                sx={{
                    marginTop:'20px',
                    backgroundColor:'white',
                    padding:'20px',
                    borderRadius: '20px',
                    boxShadow:'0px 2px 5px 0px rgba(0,0,0,.2)',
                    overflow:'hidden',
                 }}
                >
                    <Box
                     className='fligh-booking-contact-details'
                    >
                        <h3>Contact Details</h3>
                        <p>Your ticket & flight information will be sent here</p>
                        <Stack
                        direction={{ xs: 'column', sm: 'column', md:'column', lg:'row' }}
                        spacing={{sm:2.5,md:2.5}}
                        sx={{
                            display:'flex',
                            alignItems:"flex-start",
                            justifyContent:'space-between',
                            padding:'20px',
                            marginTop:'20px',
                            gap:'10px'
                        }}
                        >
                            <TextField
                            size='small'
                            label="Country Code"
                            required
                            />
                            <TextField
                            required
                            type='number'
                            size='small'
                            label="Mobile Number"
                            />
                            <TextField
                            required
                            type='email'
                            size='small'
                            label="Email"
                            />
                        </Stack>
                 </Box>
                 <Box className='flight-billing-address'>
                    <h3>GST Details</h3>
                    <p>To claim credit for the GST charged by airlines, please enter your GST details</p>
                    <div className='gst-no'>
                        <input type='checkbox' />
                        <p>I would like to add my GST Number</p>
                    </div>

                    <h3>Billing Address</h3>
                    <p>As per the latest govt. regulations, its mandatory to provide your address.</p>
                    <Stack
                     direction={{ xs: 'column', sm: 'column', md:'column', lg:'row' }}
                     spacing={{sm:2.5,md:2.5}}
                     sx={{
                        display:'flex',
                        alignItems:"flex-start",
                        justifyContent:'space-between',
                        padding:'20px',
                        gap:'10px'
                     }}
                    >

                    <TextField
                      size='small'
                      label="Pincode"
                      type='pin'
                    />
                    <TextField
                      size='small'
                      label="Address"
                      type='text'
                      />
                    <TextField
                      size='small'
                      label="City"
                      type='text'
                    />
                    <TextField
                      size='small'
                      label="State"
                      type='text'
                      />
                    </Stack>
                 </Box>
                
            </Box>
            <Box
                sx={{
                    mt:'20px',
                    display:'flex',
                    justifyContent:'space-between',
                    alignItems:'center',
                    backgroundColor:'white',
                    borderTopLeftRadius: '20px',
                    borderTopRightRadius:'20px',
                    boxShadow:'0px 2px 5px 0px rgba(0,0,0,.2)',
                    padding:'20px 20px 10px 20px',
                    position:'sticky',
                    bottom: 0,
                    zIndex:25
                }}
            >
              <Typography variant='h6'  sx={{color:'#17181C',fontWeight:'700', lineHeight:'1.4'}} component='h2' >{`₹${ticketPrice+(ticketPrice*(1/20))-selectedOption}`}</Typography> 
                <CustomButton
                    size='large' 
                    variant="contained"
                    disableElevation
                    disableRipple  
                >
                    Pay Now
                </CustomButton>
            </Box>
        </Stack>
      </Stack>

    </>
  )
}

export default FlightBooking