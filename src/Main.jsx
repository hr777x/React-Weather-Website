import React, { useState, useContext } from "react";
import "./App.css";
import { ThemeContext } from "./ThemeContext";

function Home() {
  const apiKey = "fea50eff6ebdfd7a1484e1adecbd2c75";
  const [city, setCity] = useState(""); // City input by user
  const [data, setData] = useState(null); // Weather data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const { theme, toggleTheme } = useContext(ThemeContext); // Use the theme context

  const handleInput = (event) => {
    setCity(event.target.value);
  };

  const fetchData = async () => {
    if (!city) return; // Don't fetch if city is empty
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle button click to fetch data
  const handleSearchClick = () => {
    fetchData();
  };

  return (
    <div className={`container ${theme}`}>
      
      <div className="weather">
        <div className="search">
          <input
            type="text"
            placeholder="Enter city name"
            onChange={handleInput}
          />
          <button onClick={handleSearchClick}><img src="./Assets/search.svg" alt="Search" /></button>
          
        <button onClick={toggleTheme}>
         <img src="./Assets/toggle-button.svg" alt="Switch Mode" />
         
      </button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {data && (
          <div className="weatherInfo">
            <img
              src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
              alt="Weather Icon"
            />
            <h1>{Math.round(data.main.temp - 273.15)}°C</h1>{" "}
            {/* Convert from Kelvin to Celsius */}
            <h2>{data.name}</h2>
            <div className="details">
              <div className="col">
              <img src="./Assets/humidity.svg" alt="Humidity" />
                <div className="humidity">
                  <p>{data.main.humidity}%</p>
                </div>
              </div>
              <div className="col">
              <img src="./Assets/wind.svg" alt="Wind Gusts" />
                <div className="wind">
                  <p>{data.wind.speed} km/h</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
