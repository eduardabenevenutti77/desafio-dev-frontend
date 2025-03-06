import { useState } from "react";
import styles from "./styles/Search.module.css";

interface ForecastData {
  list: Array<{
    dt: number;
    main: { temp: number; humidity: number };
    wind: { speed: number };
    weather: Array<{ description: string }>;
  }>;
  city: {
    name: string;
    country: string;
  };
}

export default function Search() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState<ForecastData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const API_KEY = "377a3172f4ae6ce8b24413e251ef34a5"; // Substitua pela sua chave real

  const fetchWeather = async () => {
    if (!location) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric&lang=pt`
      );

      if (!response.ok) throw new Error("Erro ao buscar a previsão!");

      const data: ForecastData = await response.json();
      setWeather(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
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

  // Função para alterar a cor de fundo
  const changeBackgroundColor = (color: string) => {
    document.body.style.backgroundColor = color; // Altera a cor de fundo do body
  };

  return (
    <div className={styles.weatherSearchContainer}>
      <p className={styles.nameAplication}>Manchester's Cloud</p>
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
          <h3 className={styles.cityName}>
            {weather.city.name}, {weather.city.country}
          </h3>
          <p className={styles.weatherDescription}>
            {weather.list[0].weather[0].description}
          </p>

          <p className={styles.temp}>{Math.round(weather.list[0].main.temp)}°C</p>

          <p className={styles.humidity}>Umidade: {weather.list[0].main.humidity}%</p>
          <p className={styles.wind}>Vento: {weather.list[0].wind.speed} m/s</p>

          <div className={styles.dailyForecast}>
            <h4 className={styles.titleNextDays}>Previsão para os próximos dias:</h4>
            {weather.list.slice(0, 5).map((forecast, index) => (
              <div key={index} className={styles.dailyDay}>
                <p>{new Date(forecast.dt * 1000).toLocaleDateString()}</p>
                <p>{Math.round(forecast.main.temp)}°C</p>
                <p>{forecast.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Botões para alterar a cor de fundo */}
      <div className={styles.buttonContainer}>
        <button onClick={() => changeBackgroundColor("#FF5733")}>Cor Quente</button>
        <button onClick={() => changeBackgroundColor("#5D8AA8")}>Cor Fria</button>
        <button onClick={() => changeBackgroundColor("#F0E68C")}>Cor Amena</button>
        <button onClick={() => changeBackgroundColor("#ffffff")}>Cor Padrão</button>
      </div>
    </div>
  );
}