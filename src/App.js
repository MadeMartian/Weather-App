import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import { ClipLoader } from 'react-spinners';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("London");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

      try {
        const response = await axios.get(url);
        setWeather(response.data);
        setError(null);
      } catch (error) {
        setWeather(null);
        setError("City not found or API error!");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  const handleSearch = (newCity) => {
    setCity(newCity);
    setError(null);
  };

  const getBackgroundStyle = () => {
    if (weather) {
      const condition = weather.weather[0].main.toLowerCase();

      switch (condition) {
        case 'clear':
          return { background: 'url(https://plus.unsplash.com/premium_photo-1670527200668-ad4b53a1aefb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D) no-repeat center center fixed', backgroundSize: 'cover' };
        case 'fog':
          return { background: 'url(https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D) no-repeat center center fixed', backgroundSize: 'cover' };
        case 'mist':
          return { background: 'url(https://images.unsplash.com/photo-1561993864-d030428cbda7?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWlzdHxlbnwwfHwwfHx8MA%3D%3D) no-repeat center center fixed', backgroundSize: 'cover' };
        case 'clouds':
          return { background: 'url(https://images.unsplash.com/photo-1685808860111-75533523db6e?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdWR5JTIwc2tpZXN8ZW58MHx8MHx8fDA%3D) no-repeat center center fixed', backgroundSize: 'cover' };
        case 'rain':
          return { background: 'url(https://plus.unsplash.com/premium_photo-1671229652411-4468b946b787?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D) no-repeat center center fixed', backgroundSize: 'cover' };
        case 'snow':
          return { background: 'url(https://plus.unsplash.com/premium_photo-1667579187855-fed841be2ec9?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D) no-repeat center center fixed', backgroundSize: 'cover' };
        case 'thunderstorm':
          return { background: 'url(https://plus.unsplash.com/premium_photo-1726818265070-c08eb719d77c?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D) no-repeat center center fixed', backgroundSize: 'cover' };
        default:
          return { backgroundColor: '#f0f0f0' };
      }
    }
    return { backgroundColor: '#f0f0f0' };
  };


  return (
    <div style={getBackgroundStyle()}>
      <h1>Weather App</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? (
        <ClipLoader size={50} color={"#4CAF50"} loading={loading} />
      ) : weather ? (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      ) : (
        !error && <p>Enter a city to get the weather.</p>
      )}
      <SearchBar onSearch={handleSearch} />
    </div>
  );
}

export default App;
