import React from "react";

export default function Daily({ data }) {
  const currentDate = new Date(data.dt * 1000);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="nextDay">
      <div>
        <div>{days[currentDate.getDay()]}</div>
        <div>{`${currentDate.getDate()}/${currentDate.getMonth()}`}</div>
      </div>
      <div>
        <div>{(data.temp.day - 273.15).toFixed(2)}&#8451;</div>
        <div>Temp</div>
      </div>
      <div>
        <div>{(data.temp.min-273.15).toFixed(2)}&#8451;</div>
        <div>Low</div>
      </div>
      <div>
        <div>{(data.temp.max-273.15).toFixed(2)}&#8451;</div>
        <div>high</div>
      </div>
      <div>
        <div>{`${data.wind_speed}mph`}</div>
        <div>Wind</div>
      </div>
      <div>
        <div>{data.uvi}</div>
        <div>UVI</div>
      </div>
    </div>
  );
}
