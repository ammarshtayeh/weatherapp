import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../utility";

const initialState = {
  forcastData: [],
  loading: false,
  city:[],
  list:[]
};


const fetchWeatherStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchWeathersSuccess = (state, action) => {
  return updateObject(state, { forcastData: action.forcastData,
    list:action.list,
    city:action.city,
    loading: false });
};

const fetchWeathersFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_WEATHER_START :
      return fetchWeatherStart(state, action);

    case actionTypes.FETCH_WEATHER_SUCCESS:
      return fetchWeathersSuccess(state, action);

    case actionTypes.FETCH_WEATHER_FAIL:
      return fetchWeathersFail(state, action);

    default:
      return state;
  }
};

export default reducer;
