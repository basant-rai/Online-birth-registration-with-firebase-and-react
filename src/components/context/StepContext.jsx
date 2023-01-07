import React, { createContext, useState } from "react";

// type context = {
//   userData: string,
//   setUserData: Dispatch<SetStateAction<string>> | null
// }

// type UseContextProviderProps={
//   children:React.ReactNode
// }
const StepContext = createContext({ 
  userData: "", 
  setUserData: null 
});

export function StepContextProvider({ children }) {
  const [userData, setUserData] = useState("");

  return (
    <StepContext.Provider value={{ userData, setUserData }}>
        {children}
    </StepContext.Provider>
  );
}
// export function useStepperContext() {
//   const { userData, setUserData } = useContext(StepperContext);

//   return { userData, setUserData };
// }