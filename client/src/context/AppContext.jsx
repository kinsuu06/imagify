// for storing variable ,functions of the other jsx files 

import { use, useEffect } from "react";
import { createContext,useState } from "react";
import { toast } from "react-toastify";
import axios from "axios"
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext()

const AppContextProvider = (props) =>{
    const[user,setUser] = useState(null);// to keep the track of user either user logged in or logged out 
    const [showLogin,setShowLogin] = useState(false)
    const [token,setToken] = useState(localStorage.getItem('token'))
    const [credit,setCredit] = useState(false)
    
    const backendURL = import.meta.env.VITE_BACKEND_URL; // url of backend from .env file
    
    const navigate = useNavigate()
    
    const loadsCreditData = async() => {
        try{
            const {data} = await axios.get(backendURL + '/user/credits', {headers: {token}})

            if(data.success){
                setCredit(data.credits)
                setUser(data.user)
            }
        }catch(error){
            console.log(error);
            toast.error(error.message)
        }
    }

    const generateImage = async(prompt) => {
        try{
            const {data} = await axios.post(backendURL + '/api/image/generate-image' , {prompt}, {headers: {token}})

            if(data.success){
                loadsCreditData();
                return data.resultImage;
            }else{
                toast.error(data.message)
                loadsCreditData()
                if(data.creditBalance === 0){
                    navigate('/buy')
                }
            }
        }catch(error){
            toast.error(error.message)
        }
    }

    const logout = ()=> {
        localStorage.removeItem('token')
        setToken('')
        setUser(null)
    }

    useEffect(() => {
        if(token){
            loadsCreditData()
        }
    },[token])

    const value = {
        user,setUser,showLogin,setShowLogin, backendURL, token, setToken, credit, setCredit, loadsCreditData, logout, generateImage
    }
    return (
        <AppContext.Provider value = {value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;