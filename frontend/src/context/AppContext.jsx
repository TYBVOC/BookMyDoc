import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "₹";
  const backendUrl = import.meta.env.VITE_BACKEND_URL; 
  
  


  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token"): "");
  const [userData, setUserData] = useState(false);

  // Fetch Doctors
  const getDoctorsData = async ()=>{
    try {

      const {data} = await axios.get(backendUrl+"/api/doctor/list")

      if(data.success){
        setDoctors(data.doctors)
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(data.message)
      // console.log(error.message);
      
    }
  }
  
  // Fetch User Profile
  const loadUserProfileData = async ()=>{
    try {
  
      const {data} = await axios.get(backendUrl+"/api/user/get-profile", {
        headers: {token}
      })
  
      if(data.success){
        setUserData(data.userData)
        console.log(data);
        
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      // toast.error(error.message)
    }
  }


  useEffect(() => {
    getDoctorsData()
  }, [])

  useEffect(() => {
    if (token) {
        loadUserProfileData()
    }
  }, [token])
    
  

  const value = {
    doctors,
    getDoctorsData,
    currencySymbol,
    backendUrl,
    token,
    setToken,
    userData,
    setUserData,
    loadUserProfileData,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
