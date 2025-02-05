// for storing variable ,functions of the other jsx files 

import { createContext,useState } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) =>{
    const[user,setUser] = useState(null);// to keep the track of user either user logged in or logged out 
    
    const value = {
        user,setUser
    }
    return (
        <AppContext.Provider value = {value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;