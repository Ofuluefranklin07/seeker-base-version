import { useState, useEffect } from "react";
import "./Weather.css"; // Import the CSS file
import { data } from "react-router-dom";

const API_KEY = "9c16bddc5983e91feaac79ac40086c30";

export default function Weather() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (query.trim().length < 2) {
      setWeather(null);
      setError("");
      return;
    }

    const fetchWeather = async () => {
      setLoading(true);
      setWeather(null);
      setError("");
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`
        );
        if (!response.ok) {
          throw new Error("City not found");
        }
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const debounceFetch = setTimeout(fetchWeather, 500); // Debounce API calls

    return () => clearTimeout(debounceFetch);
  }, [query]);


  return (
    <div className="container">
      <h1>Simple Weather App</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="weather-input"
          placeholder="Enter a city name..."
        />
      </form>
      {loading && <p className="loading-message">Loading weather...</p>}
      {error && <p className="error-message">{error}</p>}
      {weather && (
        <div className="weather-result">
          <h3>
            {weather.name}, {weather.sys.country}
          </h3>
          <p>
            <strong>Temperature:</strong> {weather.main.temp}°C
          </p>
          <p>
            <strong>Feels like:</strong> {weather.main.feels_like}°C
          </p>
          <p>
            <strong>Weather:</strong> {weather.weather[0].description}
          </p>
          <p>
            <strong>Humidity:</strong> {weather.main.humidity}%
          </p>
          <p>
            <strong>Wind:</strong> {weather.wind.speed} m/s
          </p>
        </div>
      )}
      <div className="weather-note">
        <small>Start typing a city name to get real-time weather updates.</small>
      </div>
    </div>
  );
}