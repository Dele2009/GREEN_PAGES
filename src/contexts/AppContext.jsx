import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = createContext({
  businessCategories: [],
  states: [],
});

function AppContextProvider({ children }) {
  const statesData = [
    "Abia",
    "Adamawa",
    "AkwaIbom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "CrossRiver",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
    "FCT",
  ];

  const [businessCategories, setBusinessCategories] = useState([]);
  const [states, setStates] = useState(statesData);

  useEffect(() => {
    const getContextData = async () => {
      const { data } = await axios.get(
        `${import.meta.env.REACT_APP_API_URL}/api/business-categories/`
      );
      const categories = data.map((item) => item.name);
      console.log(categories);
      setBusinessCategories(categories);
    };
    getContextData();

    const requestId = setInterval(()=>getContextData(), 6000)

    return () => clearInterval(requestId);
  }, []);

  return (
    <AppContext.Provider value={{ businessCategories, states }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;

export const useAppContext = () => useContext(AppContext);
