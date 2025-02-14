// for storing variable ,functions of the other jsx files 

import { use } from "react";
import { createContext,useState } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) =>{
    const[user,setUser] = useState(null);// to keep the track of user either user logged in or logged out 
    const [showLogin,setShowLogin] = useState(false)
    const value = {
        user,setUser,showLogin,setShowLogin
    }
    return (
        <AppContext.Provider value = {value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;