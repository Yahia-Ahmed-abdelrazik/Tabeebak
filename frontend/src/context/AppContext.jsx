/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

function AppContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || false);
  const currencySymbol = `$`;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);
  const [userData, setUserData] = useState(false);

  const getDocttorsData = async () => {
    try {
      const { data } = await axios(backendUrl + "/api/doctor/list");

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios(backendUrl + `/api/user/get-profile`, {
        headers: {
          token,
        },
      });

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getDocttorsData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  return (
    <AppContext.Provider
      value={{
        doctors,
        token,
        setToken,
        currencySymbol,
        backendUrl,
        userData,
        setUserData,
        loadUserProfileData,
        getDocttorsData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
