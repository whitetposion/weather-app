import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { GEO_API_URL, geoApiOptions } from '../getData';
import useDebounce from '../hooks/Debounce';


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
     const [query, setQuery] = useState<string>('');
     const debouncedSearchTerm = useDebounce(query, 1000);
     const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);

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
               <div className='relative md:w-1/4 sm:w-full'>
                    <input
                         type="text"
                         value={query}
                         onChange={(e) => {
                              setQuery(e.target.value)
                         }}
                         placeholder="Search location..."
                         className="w-full p-2 pl-10 text-white bg-white bg-opacity-25 backdrop-blur-xl rounded-md focus:ring-2 focus:ring-gray-500 focus:outline-none"
                    />
                    <div className="absolute top-2 left-2  text-white">
                         <Search size={24} />
                    </div>
                    {suggestions.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-auto">
                         {suggestions.map((suggestion,index) => (
                         <li
                              key={index}
                              className="p-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                   setQuery(suggestion.label);
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
