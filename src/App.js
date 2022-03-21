import React from "react";
import "./App.css";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

// import thunder from "./components/icons/200.png";
import GetInformation from "./components/GetInformation";
import WeatherItems from "./components/WeatherItems";

export const WeatherContext = React.createContext();

function App() {
  const [postcodes, setPostcodes] = useState([]);
  const [weatherItems, setWeatherItems] = useState([]);

  //fired when we hit submit
  const setUpSearchValues = async (postcode, suburb) => {
    //checking, we need bot postcode and suburb
    if (postcode === "" || suburb === "") return;
    let yourAPI = "APPID=977e38f95a1975a71ab670e6d142bab6";
    //yourAPI=

    //get the long and lat for postcode and suburb name entered from input
    const searchValues = postcodes.filter(
      (zone) => zone.postcode == postcode && zone.place_name === suburb
    );

    //use those long and lat to get weather API data
    const newData = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${searchValues[0].latitude}&lon=${searchValues[0].longitude}&${yourAPI}`
    );
    const newResult = await newData.json();

    //set up my new weather object
    const newWeatherItems = [
      ...weatherItems,
      {
        id: nanoid(),
        suburbData: searchValues[0],
        weatherData: newResult,
      },
    ];
    setWeatherItems(newWeatherItems);
    console.log(newWeatherItems);
  };

  const deleteWeatherItem = (id) => {
    const newWeatherItems = weatherItems.filter((item) => item.id !== id);
    setWeatherItems(newWeatherItems);
  };

  //fetch postcode to longitude and latitude
  useEffect(() => {
    async function fetchData() {
      const fetchData = await fetch(
        "https://raw.githubusercontent.com/Elkfox/Australian-Postcode-Data/master/au_postcodes.json"
      );
      const fetchPostcodes = await fetchData.json();
      setPostcodes(fetchPostcodes);
    }
    fetchData();
  }, []);

  //set up some initial values for UI
  useEffect(() => {
    setUpSearchValues(3338, "Melton South");
  }, [postcodes]);

  return (
    <WeatherContext.Provider
      value={{ postcodes, weatherItems, setUpSearchValues, deleteWeatherItem }}
    >
      <div className="App">
        <GetInformation />
        <WeatherItems />
      </div>
    </WeatherContext.Provider>
  );
}

export default App;
