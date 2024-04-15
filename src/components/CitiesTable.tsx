import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrigin } from '../hooks/useOrigin';

interface CityData {
     name: string;
     country_code: string;
     timezone: string;
     coordinates:{
          lon:number,
          lat:number
     }
}

interface APIResponse {
     results: CityData[];
}

const CitiesTable: React.FC = () => {
     const origin = useOrigin()
     const [cities, setCities] = useState<CityData[]>([]);
     const [loadMore, setLoadMore] = useState<number>(20);
     const containerRef = useRef<HTMLDivElement>(null);
     const navigate = useNavigate()
     useEffect(() => {
          fetchCities();
     }, [loadMore]); // Fetch cities when loadMore changes

     const fetchCities = () => {
          fetch(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?order_by=name&start=${loadMore}&limit=20`)
               .then((response) => response.json())
               .then((data: APIResponse) => {
                    setCities((prevCities) => [...prevCities, ...data.results]); // Append new cities to existing list
               })
               .catch((error) => {
                    console.error('Error fetching cities:', error);
               });
     };

     const handleScroll = () => {
          if (containerRef.current) {
               const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
               if (scrollTop + clientHeight === scrollHeight) {
               setLoadMore((prevLoadMore) => prevLoadMore + 20);
               }
          }
     };
     
     return (
          <div className='w-full flex justify-center bg-transparent p-2'>
               <div 
                    ref={containerRef} onScroll={handleScroll}
                    className='scrollbar w-full h-full max-h-[300px] margin-auto sm:w-[100%] md:w-[40%] overflow-y-auto rounded-md bg-opacity-25 backdrop-blur-xl bg-white text-white shadow-md'
               >
                    <table className='h-full border-none w-full'>
                         <thead className='w-full border-none'>
                              <tr className='w-full '>
                                   <th className=' font-medium text-lg sm:pl-4 md:px-4 pt-0 pb-3 text-white text-left'>City Name</th>
                                   <th className=' font-medium  text-lg md:px-4 pt-0 pb-3 text-white text-center'>Country</th>
                                   <th className=' font-medium  text-lg sm:pr-4 md:px-4 pt-0 pb-3 text-white text-right'>Timezone</th>
                              </tr>
                         </thead>
                         <tbody >
                              {cities.map((city, index) => (
                              <tr 
                                   key={index} 
                                   onContextMenu = {()=>window.open(`${origin}/${city.coordinates.lon}/${city.coordinates.lat}`, '_blank', 'noopener, noreferrer')
                              } 
                                   onClick={()=> navigate(`/${city.coordinates.lon}/${city.coordinates.lat}`)}
                                   className='hover:bg-white hover:opacity-25 hover:text-black'
                              >
                                   <td className='p-4 md:px-8 text-left'>{city.name}</td>
                                   <td className='p-4 sm:px-4 md:px-8'>{city.country_code}</td>
                                   <td className='p-4 sm:px-4 md:px-8 text-right'>{city.timezone}</td>
                              </tr>
                         ))}
                         </tbody>
                    </table>
               </div>
          </div>
     );
};

export default CitiesTable;
