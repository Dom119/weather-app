import React, { useContext, useEffect } from "react";
import { WeatherContext } from "../App";
import Daily from "./Daily";
import thunder from "./icons/200.png";
import sun from "./icons/800day.png";
import cloud from "./icons/700.png";
import snow from "./icons/600.png";
import rain from "./icons/500.png";
import rainAndThunder from "./icons/300.png";

export default function WeatherItem({ weatherItem }) {
  const { deleteWeatherItem } = useContext(WeatherContext);
  console.log(weatherItem);

  const currentDate = new Date(weatherItem.weatherData.current.dt * 1000);
  const sunRise = new Date(weatherItem.weatherData.current.sunrise * 1000);
  const sunSet = new Date(weatherItem.weatherData.current.sunset * 1000);
  const currentTemp = weatherItem.weatherData.current.temp - 273.15;
  const feelLike = weatherItem.weatherData.current.feels_like - 273.15;

  let checking = weatherItem.weatherData.current.weather[0].id / 100;

  return (
    <div className="weatherItem">
      <div className="title">
        <div>
          <h1>{weatherItem.suburbData.place_name}</h1>
          <h4>{`${weatherItem.suburbData.state_name}, ${
            weatherItem.suburbData.postcode
          }, ${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`}</h4>
        </div>
        <div className="closeButton" onClick={() => deleteWeatherItem(weatherItem.id)}></div>
      </div>

      <div className="rowContainer firstSection">
        <img
          src={
            checking === 8
              ? sun
              : checking === 2
              ? thunder
              : checking === 7
              ? cloud
              : checking === 6
              ? snow
              : checking === 5
              ? rain
              : rainAndThunder
          }
          alt=""
        />
        <div>
          <div>
            {currentTemp.toFixed(2)}
            &#8451;
          </div>
          <div style={{padding:"10px 0px"}}>
            {weatherItem.weatherData.current.weather[0].description.toUpperCase()}
          </div>
        </div>
        <div className="smallInfo">
          <div>
            <div style={{fontWeight:"bold"}}>Sunrise</div>
            <div style={{padding:"5px 0px"}}>{`${sunRise.getHours()}:${sunRise.getMinutes()}`}</div>
          </div>
          <div>
            <div style={{fontWeight:"bold"}}>Sunset</div>
            <div style={{padding:"5px 0px"}}>{`${sunSet.getHours()}:${sunSet.getMinutes()}`}</div>
          </div>
          <div>
            <div style={{fontWeight:"bold"}}>Humidity</div>
            <div style={{padding:"5px 0px"}}>{weatherItem.weatherData.current.humidity}</div>
          </div>
          <div>
            <div style={{fontWeight:"bold"}}>Feel like</div>
            <div style={{padding:"5px 0px"}}>
              {feelLike.toFixed(2)}
              {"C"}
            </div>
          </div>
        </div>
      </div>
      {/* <h4>Today Weather</h4>
      <div className="rowContainer eachDayWeather">
        <div className="eachDay">
          <div>3am</div>
          <div>icon</div>
          <div>14C</div>
        </div>
      </div> */}
      <h4>Next 8 days</h4>
      <div className="rowContainer">
        {weatherItem.weatherData.daily.map((item) => (
          <Daily key={item.dt} data={item} />
        ))}
      </div>
    </div>
  );
}
