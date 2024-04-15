import React from 'react';
import { ForecastData } from '../../types'; // Import the ForecastData interface

interface ForecastCardProps {
  forecast: ForecastData;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast }) => {
  // Extract necessary data from forecast
  const { dt_txt, main, weather } = forecast;

  // Convert timestamp to date
  const date = new Date(dt_txt);

  // Format temperature to one decimal place
  const temperature = main.temp.toFixed(1);
  const minTemp = main.temp_min.toFixed(1);
  const maxTemp = main.temp_max.toFixed(1);

  // Display weather condition
  const weatherCondition = weather[0].description;

  return (
    <div className="md:w-[15%] sm:w-[80%]  mb-4 p-4 rounded-lg bg-opacity-25 backdrop-blur-xl bg-white text-white shadow-md ">
      <div className="text-md font-semibold">{date.toDateString()}</div>
      <div className="flex items-center mt-2">
        <div className="w-full flex flex-col items-end">
          <div className="text-3xl font-semibold">{temperature}&deg;C</div>
          <div className=" font-semibold text-right">
            <span>{minTemp}</span>/<span>{maxTemp}&deg;C</span>
          </div>
        </div>
      </div>
      <div className="mt-2 text-xl  text-center">{weatherCondition}</div>
    </div>
  );
};

export default ForecastCard;
