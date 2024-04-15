import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCityForecast, getCityWeather } from '../../getData';
import { getSkyColor } from '../../lib/utility';
import { ForecastData, WeatherData } from '../../types';
import ForecastCard from './day-forecast';
import Time from '../../components/Time';

const CityWeather:React.FC = () => {

    const {lat , lon} = useParams<{ lat?: string; lon?: string}>()
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
    const [forecast , setForecast ] = useState<ForecastData[] | null>()
    const [backgroundColor, setBackgroundColor] = useState<string>("bg-gray-700")

    useEffect(() => {
          if(!lat || !lon) return 
          const cityWeather = async () => {
               try {
                    const response = await getCityWeather(parseFloat(lat), parseFloat(lon))
                    setWeatherData(response)
                    setBackgroundColor(getSkyColor(response))
               } catch (error) {
                    console.error('Error getting user location:', error);
               }
          };
          const cityForecast = async () => {
               try {
                    const response = await getCityForecast(parseFloat(lat), parseFloat(lon))
                    setForecast(response)
               } catch (error) {
                    console.error('Error getting user location:', error);
               }
          };
          cityWeather()
          cityForecast()
    }, [lon, lat]);

    if (weatherData && forecast ) return (
     <div className={`w-screen h-screen ${backgroundColor} overflow-y-auto scrollbar` }>
          <div className="w-full flex justify-start items-center flex-col pt-10">
               <div className='relative w-[80%] flex justify-between rounded-md bg-opacity-25 backdrop-blur-xl bg-white text-white shadow-md'>
                    <div className='flex flex-col items-start justify-between md:p-6 sm:p-2'>
                         <div className="relative m-4 sm:text-4xl md:text-6xl  font-semibold"><Time latitude={lat} longitude={lon}/></div>
                         <div className="relative md:text-4xl sm:text-xl m-4">{weatherData.name}, {weatherData.sys.country}</div>
                    </div>
                    <div className='flex flex-col items-end justify-between md:pr-6 sm:p-2'>
                         <div className="flex m-4 flex-col items-end md:text-5xl sm:text-3xl font-semibold md:gap-2">
                              {Math.round(weatherData.main.temp)}°C
                              <div className='md:text-lg sm:text-sm  gap-4'>
                                   <span>{Math.round(weatherData.main.temp_min)}</span>
                                   /
                                   <span>{Math.round(weatherData.main.temp_max)}</span>
                                   °C</div>
                              </div>
                         <div className="flex md:text-lg sm:text-sm justify-between flex-col sm:p-2 md:p-4 items-end">
                              <div className=''>Feels like: {Math.round(weatherData.main.feels_like)}°C</div>
                              <div className=''>{weatherData.main.pressure} hPa</div>
                              <div className=''>{weatherData.main.humidity}%</div>
                         </div>
                    </div>
               </div>
               <div className='w-[80%] py-4 flex md:flex-row sm:flex-col justify-evenly items-center'>
                    {
                         forecast.filter(( _ , index:number) => index % 8 == 0)
                         .map((forecast:ForecastData, index) =>(
                                   <ForecastCard key = {index} forecast={forecast}/>
                              )
                         )
                    }
               </div>
          </div>
     </div>
     );
     else {
          return (
               <div className='w-full flex justify-center pt-10 h-1/4'>
                    <div className='relative w-[80%] flex justify-center items-center text-center rounded-md bg-opacity-25 backdrop-blur-xl bg-gray-400 text-white text-4xl shadow-md'>
                         Oops Something went wrong !
                    </div>
               </div>
          )
     }
}

export default CityWeather
