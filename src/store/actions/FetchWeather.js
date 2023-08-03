// this file contains action creators for placing an order

import * as actionTypes from "./actionsTypes";
import axios from 'axios';


export const fetchWeathersSuccess = (forcastData , list , city) => {
  return {
    type: actionTypes.FETCH_WEATHER_SUCCESS,
    forcastData: forcastData,
    list:list,
    city:city
  };
};

export const fetchWeathersFail = error => {
  return {
    type: actionTypes.FETCH_WEATHER_FAIL,
    error: error
  };
};

export const fetchWeatherStart = () => {
  return {
    type: actionTypes.FETCH_WEATHER_START
  };
};

export const fetchWeatherData  = () => async dispatch => {
    navigator.geolocation.getCurrentPosition(function(position){
        var myLatitude = parseFloat(position.coords.latitude);
        var myLongitude = parseFloat(position.coords.longitude);
 
    dispatch(fetchWeatherStart());
  const url=  `https://api.openweathermap.org/data/2.5/forecast?lat=${myLatitude}&lon=${myLongitude}&cnt=120&appid=7fcada73c4286410650cc2658ab8e327
  `;
    axios
      .get(url)
      .then(res => {
        dispatch(fetchWeathersSuccess(res.data , res.data.list , res.data.city));
      })
      .catch(err => {
       
        dispatch(fetchWeathersFail(err));
      });
  
})
};
