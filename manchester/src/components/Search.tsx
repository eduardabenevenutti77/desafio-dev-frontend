import { useState } from "react";
import styles from "./styles/Search.module.css";

interface HourlyWeather {
  dt_txt: string;
  main: { temp: number; humidity: number };  // Incluindo umidade
  pop: number;
  weather: Array<{ description: string }>;
  wind: { speed: number };  // Incluindo a velocidade do vento
}

interface ForecastData {
  city: { name: string };
  country: string;
  lat: number;
  lon: number;
  current: {
    temp: number;
    humidity: number;
    wind_speed: number;
    weather: Array<{ description: string }>;
  };
  daily: Array<{
    temp: { day: number; night: number };
    weather: Array<{ description: string }>;
  }>;
  hourly: HourlyWeather[];
}

export default function Search() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState<ForecastData | null>(null);
  const [locationState, setLocationState] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [temperatureClass, setTemperatureClass] = useState<string>("");

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

      // Requisição para a API One Call
      const oneCallResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt`);
      if (!oneCallResponse.ok) throw new Error("Não foi possível obter os dados da previsão!");

      const forecastData: ForecastData = await oneCallResponse.json();
      setWeather(forecastData);

      // Ajustando a classe de temperatura com base na previsão
      const temp = forecastData.current.temp;
      if (temp >= 30) {
        setTemperatureClass(styles.weatherHot);
      } else if (temp <= 10) {
        setTemperatureClass(styles.weatherCold);
      } else {
        setTemperatureClass(styles.weatherMild);
      }

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
    <div className={`${styles.weatherSearchContainer} ${temperatureClass}`}>
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
          {weather.city?.name && locationState && (
            <h3>{weather.city.name}, {locationState}</h3>
          )}

          <p className={styles.temp}>{Math.round(weather.current.temp)}°C</p>
          <p className={styles.weatherDescription}>{weather.current.weather[0].description}</p>

          {weather.current.humidity !== undefined && (
            <p className={styles.humidity}>Umidade: {weather.current.humidity}%</p>
          )}

          {weather.current.wind_speed !== undefined && (
            <p className={styles.wind}>Vento: {weather.current.wind_speed} m/s</p>
          )}

          {weather.daily && weather.daily.length > 0 && (
            <div className={styles.dailyForecast}>
              <h4>Previsão para os próximos dias:</h4>
              {weather.daily.map((day, index) => (
                <div key={index} className={styles.dailyDay}>
                  <p>{Math.round(day.temp.day)}°C / {Math.round(day.temp.night)}°C</p>
                  <p>{day.weather[0].description}</p>
                </div>
              ))}
            </div>
          )}

          {weather.hourly && weather.hourly.length > 0 && (
            <div className={styles.hourlyForecast}>
              <h4>Previsão horária:</h4>
              {weather.hourly.slice(0, 6).map((hour, index) => (
                <div key={index} className={styles.hourlyHour}>
                  <p>{new Date(hour.dt_txt).toLocaleTimeString()}</p>
                  <p>{Math.round(hour.main.temp)}°C</p>
                  <p>{hour.weather[0].description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
