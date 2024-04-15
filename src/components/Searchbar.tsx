import React, { useState, useEffect } from 'react';
import { Forward, Search } from 'lucide-react';
import { GEO_API_URL, geoApiOptions } from '../getData';
import useDebounce from '../hooks/Debounce';
import { useNavigate } from 'react-router-dom';


interface LocationSuggestion {
  value: string;
  label: string;
}
interface CityData {
     id: number;
     name: string;
     countryCode: string;
     latitude: number;
     longitude: number;
}
   
interface GeoApiResponse {
     data: CityData[];
}
   

const SearchBar: React.FC = () => {
     const navigate = useNavigate()
     const [query, setQuery] = useState<LocationSuggestion>({label: "", value : ""});
     const debouncedSearchTerm = useDebounce(query.label, 500);
     const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);

     const handleClick = () => {
          if (query.value == "") return  
          const [lat , lon] = query.value.split(" ")
          navigate(`/${lon}/${lat}`)
     }
     const loadOptions = async (inputValue: string): Promise<{ value: string; label: string }[]> => {
          return fetch(
            `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
            geoApiOptions
          )
               .then((response) => response.json())
               .then((response: GeoApiResponse) => {
                    return response.data.map((city) => ({
                         value: `${city.latitude} ${city.longitude}`,
                         label: `${city.name}, ${city.countryCode}`,
                    }));
               });
        };
  
     useEffect(() => {
          const fetchSuggestions = async () => {
            if (debouncedSearchTerm) {
              const loadOptionsResponse = await loadOptions(debouncedSearchTerm);
              setSuggestions(loadOptionsResponse);
            }
          };
      
          fetchSuggestions();
     }, [debouncedSearchTerm]);
      
  
     return (
          <div className="w-full h-10 relative flex justify-center items-center mt-10 ">
               <div className='relative flex md:w-3/4 sm:1/2 lg:w-1/4'>
                    <input
                         type="text"
                         value={query.label}
                         onChange={(e) => {
                              setQuery(prev => ({...prev, label : e.target.value}))
                         }}
                         placeholder="Search location..."
                         className="w-full p-2 pl-10 text-white bg-white bg-opacity-25 backdrop-blur-xl rounded-md focus:ring-2 focus:ring-gray-500 focus:outline-none"
                    />
                    <div className="absolute top-2 left-2  text-white">
                         <Search size={24} />
                    </div>
                    <button 
                         onClick={handleClick}
                         className={`${query.value == "" ? "bg-blue-200 cursor-not-allowed": "bg-blue-500 hover:bg-blue-600"} text-white font-semibold py-2 px-4 mx-2 rounded inline-flex items-center`}
                    >
                         <Forward/>
                    </button>
                    {suggestions.length > 0 && (
                    <ul className="absolute top-10 z-10 w-full  bg-white bg-opacity-25 backdrop-blur-xl rounded-md mt-1 max-h-40 overflow-auto">
                         {suggestions.map((suggestion,index) => (
                         <li
                              key={index}
                              className="p-2 hover:bg-white hover:text-black hover:opacity-25 text-white rounded-sm cursor-pointer"
                              onClick={() => {
                                   setQuery(suggestion);
                                   setSuggestions([]);
                              }}
                         >
                              {suggestion.label}
                         </li>
                         ))}
                    </ul>
                    )}
               </div>
          </div>
     );
};

export default SearchBar;
