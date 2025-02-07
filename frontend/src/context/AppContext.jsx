import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "₹";
  const backendUrl = "http://localhost:5000";  // Change this to your actual backend URL


  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "dummy-token");
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    Address: "house no 145",
  });

  
  // Simulate getting doctors' data
  const getDoctorsData = async () => {
    try {
      // Dummy doctors' list
      const dummyDoctors = [
        { id: 1, name: "Dr. A", specialty: "Cardiology" },
        { id: 2, name: "Dr. B", specialty: "Neurology" },
      ];
      setDoctors(dummyDoctors);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch doctors.");
    }
  };

  // Simulate getting user profile
  const loadUserProfileData = async () => {
    try {
      // Dummy user data
      const dummyUser = {
        name: "John Doe",
        email: "johndoe@example.com",
        Address: "house no 145",
      };
      setUserData(dummyUser);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load user profile.");
    }
  };

  const updateUserProfile = async (updatedData) => {
    try {
      // Simulate API response delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
  
      // Update userData state locally
      setUserData((prevData) => ({ ...prevData, ...updatedData }));
  
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile.");
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    }
  }, [token]);

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
    updateUserProfile,

  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
