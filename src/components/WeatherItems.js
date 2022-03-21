import React, { useContext, useEffect } from "react";
import { WeatherContext } from "../App";
import WeatherItem from "./WeatherItem";

export default function WeatherItems() {
  const { weatherItems } = useContext(WeatherContext);

  return (
    <div className="weatherItems">
      {weatherItems.map((weatherItem) => (
        <WeatherItem key={weatherItem.id} weatherItem={weatherItem} />
      ))}
    </div>
  );
}
