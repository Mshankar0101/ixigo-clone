import React,{useState,useEffect} from 'react';
import GlobalContext from './Contexts';

const GlobalContextProvider = ({children}) => {
    const [resolution, setResolution] = useState({ width: window.innerWidth, height: window.innerHeight });
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
    <GlobalContext.Provider value={{resolution,setResolution}}>
        {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider;