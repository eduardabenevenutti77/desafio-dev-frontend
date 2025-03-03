import { useState } from "react";
import styles from "./styles/Search.module.css"; 

interface WeatherData {
  name: string;
  sys: { country: string };
  main: { temp: number };
  weather: { description: string }[];
}

export default function Search() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]); 
  const [loading, setLoading] = useState<boolean>(false);

  const API_KEY = "SUA_API_KEY"; 
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt`;

  const fetchSuggestions = async () => {
    if (!city) return;

    setLoading(true);
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/find?q=${city}&appid=${API_KEY}&units=metric&lang=pt`);
      if (!response.ok) throw new Error("Erro ao buscar sugestões");

      const data = await response.json();
      setSuggestions(data.list.map((item: any) => item.name)); 
    } catch (err) {
      console.error("Erro ao buscar sugestões:", err);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("A busca não retornou nenhum resultado!");

      const data = await response.json();
      setWeather(data);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro desconhecido");
      }
      setWeather(null);
    }
  };

  const handleCitySelect = (selectedCity: string) => {
    setCity(selectedCity);
    setSuggestions([]); 
    fetchWeather(); 
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.weatherSearchContainer}>
        <input
          type="text"
          placeholder="Busque por uma cidade"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            fetchSuggestions(); 
          }}
          className={styles.input}
        />
        <button onClick={fetchWeather} className={styles.button}>
          Buscar
        </button>

        {error && <p className={styles.error}>{error}</p>}

        {loading && <p className={styles.sugestao}>Buscando sugestões conforme sua busca...</p>}

        {suggestions.length > 0 && (
          <div className={styles.suggestionsContainer}>
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className={styles.suggestionButton}
                onClick={() => handleCitySelect(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {weather && (
          <div className={styles.weatherInfo}>
            {weather.name && weather.sys && weather.sys.country && (
              <h3>{weather.name}, {weather.sys.country}</h3>
            )}
            {weather.main && weather.main.temp && (
              <p>🌡️ {weather.main.temp}°C</p>
            )}
            {weather.weather && weather.weather[0] && weather.weather[0].description && (
              <p>☁️ {weather.weather[0].description}</p>
            )}
          </div>
        )}
      </div>
    </footer>
  );
}