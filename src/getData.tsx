import { Coordinates } from "./types";

export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo"; 
export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather"
const API_KEY = import.meta.env.VITE_REACT_WEATHER_API_KEY 
const GEO_API_KEY= import.meta.env.VITE_REACT_GEO_API_KEY 

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
          // console.log(weatherResponse);
          // const weatherResponse = {
          //      "coord": {
          //          "lon": 72.8634,
          //          "lat": 19.3022
          //      },
          //      "weather": [
          //          {
          //              "id": 800,
          //              "main": "Clear",
          //              "description": "साफ आकाश",
          //              "icon": "01n"
          //          }
          //      ],
          //      "base": "stations",
          //      "main": {
          //          "temp": 28.03,
          //          "feels_like": 30.21,
          //          "temp_min": 28.03,
          //          "temp_max": 28.03,
          //          "pressure": 1010,
          //          "humidity": 66,
          //          "sea_level": 1010,
          //          "grnd_level": 1006
          //      },
          //      "visibility": 10000,
          //      "wind": {
          //          "speed": 2.36,
          //          "deg": 285,
          //          "gust": 2.54
          //      },
          //      "clouds": {
          //          "all": 4
          //      },
          //      "dt": 1712689894,
          //      "sys": {
          //          "type": 1,
          //          "id": 9052,
          //          "country": "IN",
          //          "sunrise": 1712710482,
          //          "sunset": 1712755469
          //      },
          //      "timezone": 19800,
          //      "id": 1275248,
          //      "name": "Borivali",
          //      "cod": 200
          // }
          return weatherResponse;
     } catch(error) {
          console.log(error);
          
     }
}