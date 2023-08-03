import React, { useEffect } from 'react';
import DisplayDaily from '../DisplayDaily/DisplayDaily';
import classes from './weatherData.module.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

const WeatherData = ({ onFetchWeather, list }) => {
  useEffect(() => {
    onFetchWeather();
  }, [onFetchWeather]);

  const _groupByDays = (data) => {
    return data.reduce((list, item) => {
      const forecastDate = item.dt_txt.substr(0, 10);
      list[forecastDate] = list[forecastDate] || [];
      list[forecastDate].push(item);
      return list;
    }, {});
  };

  const _getDayInfo = (data) => {
    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return daysOfWeek[new Date(data[0].dt * 1000).getDay()];
  };

  const _getIcon = (data) => `https://openweathermap.org/img/w/${data[0].weather[0].icon}.png`;

  const _getInfo = (data, min = [], max = [], humidity = []) => {
    data.forEach((item) => {
      max.push(item.main.temp_max);
      min.push(item.main.temp_min);
      humidity.push(item.main.humidity);
    });

    const minMax = {
      min: Math.round(Math.min(...min)),
      max: Math.round(Math.max(...max)),
    };

    const avgHumidity = Math.round(humidity.reduce((curr, next) => curr + next) / humidity.length);

    return (
      <div>
        <div>
          <strong>{`${Number.parseInt(minMax.max) - 275}°C`}</strong> / {`${Number.parseInt(minMax.min) - 275}°C`}
        </div>
        <div>
          {`Avg. Humidity: ${avgHumidity}%`}
        </div>
      </div>
    );
  };

  const tiles = Object.values(_groupByDays(list));
  const forecastTiles = tiles.length > 5 ? tiles.slice(0, 5) : tiles;

  return (
    <div className={classes.WeatherCards}>
      {forecastTiles.map((item, i) => (
        <DisplayDaily
          key={i}
          wdats={item}
          mySrc={_getIcon(item)}
          info={_getDayInfo(item)}
          day={_getInfo(item)}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    list: state.list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchWeather: () => dispatch(actions.fetchWeatherData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherData);
