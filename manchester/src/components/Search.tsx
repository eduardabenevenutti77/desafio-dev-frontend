import { useState } from "react";
import styles from "./styles/Search.module.css";

interface HourlyWeather {
  temp: number;
  weather: Array<{
    description: string;
  }>;
  pop: number;  // probabilidade de precipitação
}


interface WeatherData {
  name: string;
  sys: { country: string };
  main: { temp: number };
  hourly: HourlyWeather[];
}

export default function Search() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [locationState, setLocationState] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const API_KEY = "377a3172f4ae6ce8b24413e251ef34a5";

  const fetchWeather = async () => {
    if (!location) return;

    try {
      setLoading(true);
      setError(null);

      const geoResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`);
      if (!geoResponse.ok) throw new Error("Não foi possível obter a localização da cidade!");

      const geoData = await geoResponse.json();
      if (geoData.length === 0) throw new Error("Cidade não encontrada!");

      const { lat, lon, state: fetchedState, country } = geoData[0];
      setLocationState(fetchedState || country || "");

      const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt`);
      if (!weatherResponse.ok) throw new Error("Não foi possível obter os dados do clima!");

      const weatherData = await weatherResponse.json();
      setWeather(weatherData);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro desconhecido");
      }
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fetchWeather();
    }
  };

  return (
    <div className={styles.weatherSearchContainer}>
      <input
        type="text"
        placeholder="Busque por uma cidade"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onKeyDown={handleKeyDown}
        className={styles.input}
      />

      {error && <p className={styles.error}>{error}</p>}
      {loading && <p className={styles.loading}>Carregando...</p>}

      {weather && (
        <div className={styles.weatherInfo}>
          {weather.name && locationState && weather.sys?.country && (
            <h3>{weather.name}, {locationState}, {weather.sys.country}</h3>
          )}

          {weather.main?.temp && <p className={styles.temp}>🌡️ Temperatura: {Math.round(weather.main.temp)}°C</p>}


          {weather.hourly?.[0]?.pop !== undefined && (
            <p>🌧️ Probabilidade de chuva: {(weather.hourly[0].pop * 100).toFixed(0)}%</p>
          )}
        </div>
      )}

    </div>
  );
}
