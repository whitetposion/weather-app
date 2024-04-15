import { Coordinates } from "./types";

export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo"; 
export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather"
export const FORECAST_API_URL = "https://api.openweathermap.org/data/2.5/forecast"
export const TIMEZONE_API_URL = "https://api.ipgeolocation.io/timezone"
const API_KEY = import.meta.env.VITE_REACT_WEATHER_API_KEY 
const GEO_API_KEY= import.meta.env.VITE_REACT_GEO_API_KEY 
const TIME_API_KEY = import.meta.env.VITE_REACT_TIME_API_KEY

export const geoApiOptions = {
     method: "GET",
     headers: {
       "X-RapidAPI-Key": GEO_API_KEY,
       "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
     },
};


export const getLocation = (): Promise<Coordinates | null> => {
     return new Promise((resolve, reject) => {
          if (!navigator.geolocation) {
          reject(new Error('Geolocation is not supported by this browser'));
          } else {
               navigator.geolocation.getCurrentPosition(
                    (position) => {
                    const coords: Coordinates = {
                         latitude: position.coords.latitude,
                         longitude: position.coords.longitude,
                    };
                    resolve(coords);
                    },
                    (error) => {
                         reject(error);
                    }
               );
          }
     });
};
export const getCityWeather = async (latitude:number, longitude:number, metrics: string = "metric") => {
     try{
          const response = await fetch(`${WEATHER_API_URL}?lat=${latitude}&lon=${longitude}&units=${metrics}&appid=${API_KEY}`)
          const weatherResponse = await response.json()
          if (!weatherResponse) return null;
          return weatherResponse;
     } catch(error) {
          console.log(error);
          
     }
}
export const getCityForecast = async (latitude:number, longitude:number, metrics: string = "metric") => {
     try{
          const response = await fetch(`${FORECAST_API_URL}?lat=${latitude}&lon=${longitude}&units=${metrics}&appid=${API_KEY}`)
          const forecastResponse = await response.json()
          if (!forecastResponse) return null;
          return forecastResponse.list;
     } catch(error) {
          console.log(error);
          
     }
}
export const getCityTime = async (latitude:number, longitude:number) => {
     try{
          const response = await fetch(`${TIMEZONE_API_URL}?apiKey=${TIME_API_KEY}&lat=${latitude}&long=${longitude}`)
          const timeResponse = await response.json()
          if (!timeResponse) return null;
          return timeResponse;
     } catch(error) {
          console.log(error);
          
     }
}