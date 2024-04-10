type WeatherResponse = {
     weather: {
       id: number;
       main: string;
       description: string;
       icon: string;
     }[];
     dt: number;
     sys: {
       sunrise: number;
       sunset: number;
     };
   }
export const getSkyColor = (weatherResponse: WeatherResponse) => {
     const currentTime = weatherResponse.dt;
     const sunrise = weatherResponse.sys.sunrise;
     const sunset = weatherResponse.sys.sunset;
     const weatherCondition = weatherResponse.weather[0].main;
   
     // Determine if it's day or night
     const isDay = currentTime >= sunrise && currentTime <= sunset;
   
     // Basic color scheme based on the condition and time
     switch (weatherCondition) {
        case 'Clear':
          return isDay ? "bg-clear-day" : "bg-clear-night"; // Light blue for day, dark blue for night
        case 'Clouds':
          return isDay ? "bg-cloudy-day" : "bg-cloudy-night"; // Light gray for day, dark gray for night
        case 'rain':
        case 'Drizzle':
          return "bg-drizzle" ; // Gray for rainy conditions
        case 'Thunderstorm':
          return "bg-thunderstorm"; // Dark gray for stormy conditions
        case 'Snow':
          return isDay ? "bg-snow-day" : "bg-snow-night"; // Snow white
        default:
          return isDay ? "bg-clear-day" : "bg-clear-night"; // Default colors if none of the above
     }
};