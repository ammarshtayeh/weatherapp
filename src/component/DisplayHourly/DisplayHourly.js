import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const DisplayHourly = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiKey = '7fcada73c4286410650cc2658ab8e327';

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current&appid=${apiKey}`;

          axios
            .get(apiUrl)
            .then((response) => {
              const hourlyData = response.data.hourly.map((item) => ({
                time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                temperature: (item.temp - 275), // Convert temperature to Celsius
              }));

              console.log(hourlyData);

              setWeatherData(hourlyData);
              setLoading(false);
            })
            .catch((error) => {
              console.error('Error fetching weather data:', error);
              setLoading(false);
            });
        },
        (error) => {
          console.error('Error getting current location:', error);
          setLoading(false);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setLoading(false);
    }
  }, []);

  return (
    <div>
      <h2>Hourly Temperature Chart</h2>
      {loading ? (
        <div>Loading data...</div>
      ) : (
        <AreaChart width={600} height={300} data={weatherData}>
          <XAxis dataKey="time" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip
            formatter={(value) => `${value.toFixed(2)}°C`} // Format tooltip to display Celsius values
          />
          <Area dataKey="temperature" fill="#8884d8" stroke="#8884d8" />
        </AreaChart>
      )}
    </div>
  );
};

export default DisplayHourly;
