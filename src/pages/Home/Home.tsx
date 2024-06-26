import React,{ useEffect, useState } from 'react'
import { getCityWeather, getLocation } from '../../getData';
import { getSkyColor } from '../../lib/utility';
import { Coordinates } from '../../types';
import Herosection from '../../components/Herosection';
import "./Home.css"
import Searchbar from '../../components/Searchbar';
import CitiesTable from '../../components/CitiesTable';


const Home:React.FC = () => {
     const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
     const [data, setData] = useState(null)
     const [backgroundColor, setBackgroundColor] = useState<string>("bg-gray-700")
     
     useEffect(() => {
          const askForLocation = async () => {
               try {
                    const location = await getLocation();
                    setCoordinates(location);
               } catch (error) {
                    console.error('Error getting user location:', error);
               }
          };
          askForLocation();
     }, []);
     useEffect(() => {
          if(!coordinates) return
          const cityWeather = async () => {
               try {
                    const response = await getCityWeather(coordinates.latitude, coordinates.longitude)
                    setData(response)
                    setBackgroundColor(getSkyColor(response))
               } catch (error) {
                    console.error('Error getting user location:', error);
               }
          };
          cityWeather()
     }, [coordinates]);
     return (
          <div className={`w-full h-full ${backgroundColor}`}
          >
               <Herosection weatherData={data}/>
               <Searchbar/>
               <CitiesTable/>
          </div>
     )
}

export default Home
