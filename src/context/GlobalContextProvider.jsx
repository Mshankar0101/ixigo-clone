import React,{useState} from 'react';
import GlobalContext from './Contexts';

const GlobalContextProvider = ({children}) => {
    const [resolution, setResolution] = useState({ width: window.innerWidth, height: window.innerHeight });
     
  return (
    <GlobalContext.Provider value={{resolution,setResolution}}>
        {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider;