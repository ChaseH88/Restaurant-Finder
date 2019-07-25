import React, { useState, createContext } from "react";

export const Context = createContext();

const AppContext = ({ children }) => {

  const [data, setData] = useState({
    userLongitude: null,
    userLatitude: null
  });

  return(
    <Context.Provider value={{ data, setData }}>
      {children}
    </Context.Provider>
  )
}

export default AppContext;