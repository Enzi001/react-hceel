import React, { useEffect, useState } from "react";

// Хот болон цаг агаарын, ачаалал, алдаа UseState
const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // цаг агаарын мэдээллийг татах функц
  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    setWeather(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a6db678ba64eafd6ae8695bc0d3fd856`
      );
      // хэрэв хот олдохгүй байх юм бол алдаа заагаарай
      if (!response.ok) {
        throw new Error("Хот олдсонгүй");
      }
      // JSON format тай өгөгдлийг уншина
      const data = await response.json();
      // цаг агаарын мэдээллийг state хадгалах
      setWeather(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(()=>{
    if(city){
        fetchWeather(city)
    }
  },[city])
  // хотын нэрийг өөрчлөх үйлдэл
  const handleInputChange=(e)=>{
      setCity(e.target.value);
  }
  // хайлтыг товч дээр дарах үйлдэл
  const handleSearch=()=>{
    fetchWeather(city);
  }
  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Хотын нэрийг оруулна уу"
      />
      <button onClick={fetchWeather}>Цаг агаар шалгах</button>
      {loading && <p>Ачааллаж байна...</p>}
      {error && <p>{error}</p>}
      {weather && (
        <div>
          <h2>{weather.name} хотын цаг агаар</h2>
          <p>Температур: {Math.round(weather.main.temp - 273.15)}°C</p>
          <p>Тайлбар: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
