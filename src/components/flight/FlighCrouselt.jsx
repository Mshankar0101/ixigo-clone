import React from 'react'
import Carousel from 'react-multi-carousel';
const FlighCrouselt = ({offer}) => {
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
    
  return (

    <>
    
    <div className="carousel-container"> 
              <Carousel 
                  keyBoardControl={true} 
                  raggable={ true}
                  swipeable={true}
                  responsive={responsive} 
              >
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
      </div>
    </>
  )
}

export default FlighCrouselt