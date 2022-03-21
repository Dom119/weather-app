import React, { useContext, useState } from "react";
import { WeatherContext } from "../App";

export default function GetInformation() {
  const { postcodes, setUpSearchValues } = useContext(WeatherContext);
  const [postcode, setPostcode] = useState("");
  const [suburbs, setSuburbs] = useState([]);
  const [chosenSuburb, setChosenSuburb] = useState("");

  const setUpSuburbs = (postcode) => {
    const listPotentialSuburbs = postcodes.filter(
      (zone) => zone.postcode == postcode
    );
    setSuburbs(listPotentialSuburbs);
    setChosenSuburb(listPotentialSuburbs[0].place_name);
  };

  return (
    <div>
      <h1>Please enter your postcode and choose your suburb </h1>
      <input
        type="text"
        value={postcode}
        onChange={(event) => {
          event.preventDefault();
          setPostcode(event.target.value);
          setUpSuburbs(event.target.value);
        }}
      />
      <select
        onChange={(event) => {
          event.preventDefault();
          setChosenSuburb(event.target.value);
        }}
      >
        {suburbs.map((sub) => (
          <option key={sub.postcode + sub.place_name} value={sub.place_name}>
            {sub.place_name}
          </option>
        ))}
      </select>
      <button
        onClick={(event) => {
          event.preventDefault();
          setUpSearchValues(postcode, chosenSuburb);
        }}
      >
        Add Suburb
      </button>
    </div>
  );
}
