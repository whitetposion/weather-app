export type Coordinates = {
     latitude: number;
     longitude: number;
}
export interface WeatherData {
     coord: {
          lon: number;
          lat: number;
     };
     weather: {
          id: number;
          main: string;
          description: string;
          icon: string;
     }[];
     main: {
          temp: number;
          feels_like: number;
          temp_min: number;
          temp_max: number;
          pressure: number;
          humidity: number;
     };
          sys: {
          country: string;
          sunrise: number;
          sunset: number;
     };
     name: string;
}
export interface ForecastData {
     dt: number;
     main: {
         temp: number;
         feels_like: number;
         temp_min: number;
         temp_max: number;
         pressure: number;
         sea_level: number;
         grnd_level: number;
         humidity: number;
         temp_kf: number;
     };
     weather: {
         id: number;
         main: string;
         description: string;
         icon: string;
     }[];
     clouds: {
         all: number;
     };
     wind: {
         speed: number;
         deg: number;
         gust: number;
     };
     visibility: number;
     pop: number;
     sys: {
         pod: string;
     };
     dt_txt: string;
 }