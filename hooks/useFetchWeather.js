import { useEffect, useState } from "react";
import {
  fetchWeatherByCity,
  fetchForcastByCity,
  fetchWeather,
  fetchForcast,
} from "@/services/services";

const options = { year: "numeric", month: "long", day: "numeric" };

const useFetchWeather = () => {
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState();
  const [isDataFetch, setIsDataFetch] = useState();
  const [city, setCity] = useState("");

  const handleSearch = async () => {
    setIsLoading(true);
    setIsDataFetch(false);
    const info = await fetchWeatherByCity(city);
    const forecast = await fetchForcastByCity(city);
    if (info.cod !== 200) {
      setIsDataFetch(true);
    } else if (info && forecast) {
      setWeather({
        name: info.name,
        temp: info.main,
        date: new Date(info.dt * 1000).toLocaleDateString("en-US", options),
        description: info.weather[0].description,
        icon: info.weather[0].icon,
        weeklydata: forecast.list,
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
      if (navigator.geolocation) {
        setIsLoading(true)
      navigator.geolocation.getCurrentPosition(
        async function (position) {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          const info = await fetchWeather(coords);
          const forecast = await fetchForcast(coords);
          if (info.cod !== 200) {
            setIsDataFetch(true);
          }
          if (info && forecast) {
            setWeather({
              name: info.name,
              temp: info.main,
              date: new Date(info.dt * 1000).toLocaleDateString(
                "en-US",
                options
              ),
              description: info?.weather[0].description,
              icon: info.weather[0].icon,
              weeklydata: forecast.list,
            });
            setIsLoading(false);
          }
        },
        async function (error) {
            alert('No geolocation support')
            setIsLoading(false);
            setIsDataFetch(true)
        }
      );
    }
  }, []);

  return {
    isDataFetch,
    isLoading,
    weather,
    handleSearch,
    setCity,
  };
};

export default useFetchWeather;
