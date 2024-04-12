import React, { useEffect, useState } from 'react';
import { WeatherData } from '../types';


interface HeroSectionProps {
  weatherData: WeatherData | null;
}

const HeroSection: React.FC<HeroSectionProps> = ({ weatherData }) => {
     const [currentTime, setCurrentTime] = useState<string>(getCurrentTime());

     useEffect(() => {
          const intervalId = setInterval(() => {
          setCurrentTime(getCurrentTime());
          }, 10000); // Update every 10 sec
   
          return () => clearInterval(intervalId);
     }, []);
   
     function getCurrentTime(): string {
          return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
     }
     if (weatherData) return (
          <div className="w-full flex justify-center pt-10">
               <div className='relative w-[80%] flex justify-between rounded-md bg-opacity-25 backdrop-blur-xl bg-white text-white shadow-md'>
                    <div className='flex flex-col items-start justify-between md:p-6 sm:p-2'>
                         <div className="relative m-4 sm:text-4xl md:text-6xl  font-semibold">{currentTime}</div>
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
                    {/* <div className="text-lg mt-4">{weatherData?.weather[0].description}</div> */}
               </div>
          </div>
     );
};

export default HeroSection;
