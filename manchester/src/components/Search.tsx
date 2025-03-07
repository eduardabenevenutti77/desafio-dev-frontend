import { useEffect, useState } from "react";
import styles from "./styles/Search.module.css";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";

const API_KEY = "377a3172f4ae6ce8b24413e251ef34a5";

interface ForecastData {
  list: Array<{
    dt: number;
    main: { temp: number; humidity: number };
    wind: { speed: number };
    weather: Array<{ description: string }>;
  }>;
  city: { name: string; country: string };
}

export default function Search() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState<ForecastData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isColdMode, setIsColdMode] = useState(true);
  const [bgColor, setBgColor] = useState("#5D8AA8");
  const [searchHistory, setSearchHistory] = useState<string[]>(
    JSON.parse(localStorage.getItem("searchHistory") || "[]")
  );
  const [favoriteCities, setFavoriteCities] = useState<string[]>( 
    JSON.parse(localStorage.getItem("favoriteCities") || "[]")
  );

  useEffect(() => {
    document.body.style.backgroundColor = bgColor;
  }, [bgColor]);

  const toggleBackground = () => {
    setBgColor(isColdMode ? "#B0C4DE" : "#5D8AA8");
    setIsColdMode(!isColdMode);
  };

  const fetchWeather = async (city: string) => {
    if (!city) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=pt`
      );

      if (!response.ok) throw new Error("Erro ao buscar a previsão!");

      const data: ForecastData = await response.json();
      setWeather(data);

      if (!searchHistory.includes(city)) {
        const updatedHistory = [...searchHistory, city];
        setSearchHistory(updatedHistory);
        localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fetchWeather(location);
    }
  };

  const toggleFavorite = (city: string) => {
    let updatedFavorites;
    if (favoriteCities.includes(city)) {
      updatedFavorites = favoriteCities.filter(favCity => favCity !== city);
    } else {
      updatedFavorites = [...favoriteCities, city];
    }
    setFavoriteCities(updatedFavorites);
    localStorage.setItem("favoriteCities", JSON.stringify(updatedFavorites));
  };

  const getDailyForecasts = () => {
    if (!weather) return [];

    const forecasts: { [key: string]: any } = {};

    weather.list.forEach((forecast) => {
      const date = new Date(forecast.dt * 1000).toLocaleDateString();
      if (!forecasts[date]) {
        forecasts[date] = {
          temp: forecast.main.temp,
          description: forecast.weather[0].description,
        };
      }
    });

    return Object.keys(forecasts).map((date) => ({
      date,
      ...forecasts[date],
    }));
  };

  const handleHistoryClick = (city: string) => {
    setLocation(city);
    fetchWeather(city);
  };

  return (
    <div className={styles.weatherSearchContainer}>
      <button className={styles.toggleButton} onClick={toggleBackground}>
        {isColdMode ? <DarkModeIcon /> : <LightModeIcon />}
      </button>

      <p className={styles.nameAplication}>Manchester's Cloud</p>
      <input
        type="text"
        placeholder="Busque por uma cidade"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onKeyDown={handleKeyDown}
        className={styles.input}
      />

      <button onClick={() => fetchWeather(location)} className={styles.searchButton}>
        Buscar
      </button>

      {error && <p className={styles.error}>{error}</p>}
      {loading && <p className={styles.loading}>Carregando...</p>}

      {weather && (
        <div className={styles.weatherInfo}>
          <h3 className={styles.cityName}>
            {weather.city.name}, {weather.city.country}
            <button
              onClick={() => toggleFavorite(weather.city.name)}
              className={styles.favoriteButton}
            >
              {favoriteCities.includes(weather.city.name) ? (
                <Favorite sx={{ color: "red" }} />
              ) : (
                <FavoriteBorder sx={{ color: "red" }} />
              )}
            </button>
          </h3>
          <p className={styles.weatherDescription}>
            {weather.list[0].weather[0].description}
          </p>
          <p className={styles.temp}>
            {Math.round(weather.list[0].main.temp)}°C
          </p>
          <p className={styles.humidity}>
            Umidade: {weather.list[0].main.humidity}%
          </p>
          <p className={styles.wind}>
            Vento: {weather.list[0].wind.speed} m/s
          </p>

          <div className={styles.forecast}>
            <h4>Previsão para os próximos dias:</h4>
            {getDailyForecasts().map((forecast, index) => (
              <div key={index} className={styles.forecastItem}>
                <p>{forecast.date}</p>
                <p>{Math.round(forecast.temp)}°C</p>
                <p>{forecast.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={styles.historyContainer}>
        <h4>Histórico de Cidades</h4>
        <ul className={styles.historyList}>
          {searchHistory.map((city, index) => (
            <li key={index} onClick={() => handleHistoryClick(city)} className={styles.historyItem}>
              {city}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.favoriteContainer}>
        <h4>Cidades Favoritas</h4>
        <ul className={styles.historyList}>
          {favoriteCities.map((city, index) => (
            <li
              key={index}
              onClick={() => handleHistoryClick(city)}
              className={styles.historyItem}
            >
              {city}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
