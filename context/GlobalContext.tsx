import React, {
    createContext,
    useContext,
    useEffect,
    useState,
  } from "react";
  const GlobalContext = createContext(null);
  
  export const GlobalContextProvider = ({ children }: {children: any}) => {
  
    // input state
    const [jobTitle, setJobTitle] = useState(null);

  
    return (
      <GlobalContext.Provider
        value={{
         
          jobTitle,
          
        }}
      >
        {children}
      </GlobalContext.Provider>
    );
  };
  
  export const useGlobalContext = () => {
    return useContext(GlobalContext);
  };
  