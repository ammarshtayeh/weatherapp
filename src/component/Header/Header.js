import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import classes from './Header.module.css';
import * as actions from '../../store/actions/index';

const Header = ({ onFetchWeather, city }) => {
  useEffect(() => {
    onFetchWeather();
  }, [onFetchWeather]);

  return (
    <div className={classes.myHeader}>
      <header className={classes.main}>
        <div>
          <img src={require('../../images/rain.png')} alt="Rain Icon" />
        </div>
        <div>
          <img src={require('../../images/cloudy.png')} alt="Cloudy Icon" />
        </div>
        <div>
          <img src={require('../../images/stars.png')} alt="Stars Icon" />
        </div>
        {/* Add more images as needed for your header */}
        <div className={classes.Title}>
          5-Day Weather Forecast
        </div>
        <div>
          <img src={require('../../images/storm.png')} alt="Storm Icon" />
        </div>
        <div>
          <img src={require('../../images/climate-change.png')} alt="Climate Change Icon" />
        </div>
        <div>
          <img src={require('../../images/sunset.png')} alt="Sunset Icon" />
        </div>
        <div>
          <img src={require('../../images/clouds-and-sun.png')} alt="Clouds and Sun Icon" />
        </div>
        <div>
          <img src={require('../../images/windy.png')} alt="Windy Icon" />
        </div>
      </header>
      <span>{city.name}</span>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    city: state.city,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchWeather: () => dispatch(actions.fetchWeatherData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
