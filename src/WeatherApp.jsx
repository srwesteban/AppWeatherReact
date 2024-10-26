import React, { useState } from "react";
import "./WeatherApp.css";

export const WeatherApp = () => {

  const [city, setCity] = useState('');

  const apiKey = "b06a70c9dca0f7feed1dc136f4cfe298";

  const urlBase = 'https://api.openweathermap.org/data/2.5/weather';

  const difKelvin = 273.15;

  const [weatherData, setWeatherData] = useState(null)

  const fetchWeatherData = async () =>{
    try{
      const response = await fetch(`${urlBase}?q=${city}&appid=${apiKey}&lang=es`)
      const data = await response.json()
      setWeatherData(data)

    }catch(error){
      console.error(error);
    }
  }

  const handleCityChange = (event) =>{
    setCity(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(city);
    fetchWeatherData()

  };

  return (
    <div className="container">
      <h1> Aplicacion del clima</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Ingresa una ciudad" value={city} onChange={handleCityChange}/>
        <button type="submit">Consultar</button>
      </form>
      {weatherData && (
        <div>
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>La temperatura actual es de: {Math.floor(weatherData.main.temp - difKelvin)}C</p>
          <p>La condicion meteorologica actual es de: {weatherData.weather[0].description}</p>
          <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description}  />
        </div>
      )}
    </div>

  );
};
