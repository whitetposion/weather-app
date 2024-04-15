import React, { useEffect, useState } from 'react';
import { getCityTime } from '../getData';

interface TimeProps {
  latitude?: string;
  longitude?: string;
}

const Time: React.FC<TimeProps> = ({ latitude, longitude }) => {
     const [currentTime, setCurrentTime] = useState<any>();
     useEffect(() => {
     const fetchTimezone = async () => {
          try {
               if(!latitude || !longitude) return
               const response = await getCityTime(parseFloat(latitude), parseFloat(longitude))
               console.log(response)
               setCurrentTime(response);
          } catch (error) {
               console.error('Error fetching timezone:', error);
          }
     };

     fetchTimezone();

     }, [latitude, longitude]);

     return (
          <div>
               {/* <p>{day}{mmdd}</p> */}
               <p>{currentTime?.time_12}</p>
          </div>
     );
};

export default Time;
