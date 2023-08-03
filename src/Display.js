import React from "react";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import "./Display.css"; // Assuming you import the CSS as Display.css

function Display({ weatherReport }) {
  if (!weatherReport) {
    return null;
  }

  const {
    coord: { lon, lat },
    weather: [{ description: weatherdiscription }],
    main: { temp, pressure, humidity },
    wind: { speed: wind },
    sys: { country },
    name: city,
  } = weatherReport;

  return (
    <div className="DisplayCard">
      <CardContent>
        <Box className="DisplayCard__Location">
          <Typography variant="h4" color="textPrimary" className="city">
            {city}, {country}
          </Typography>
          <Typography variant="caption" color="textSecondary" className="country">
            {lon}, {lat}
          </Typography>
        </Box>
      </CardContent>
      <CardContent>
        <Box className="DisplayCard__WeatherInfo">
          <Typography variant="h5" color="textPrimary" className="DisplayCard__Temperature">
            {temp} <span className="DisplayCard__DegreesSymbol">&#176;C</span>
          </Typography>
          <Typography variant="h6" color="textSecondary" className="DisplayCard__Description">
            {weatherdiscription}
          </Typography>
        </Box>
      </CardContent>
      <CardContent>
        <Box className="DisplayCard__AdditionalInfo">
          <Box className="DisplayCard__AdditionalInfoItem">
            <Typography variant="body1" color="textPrimary" className="label">
              Humidity
            </Typography>
            <Typography variant="body1" color="textPrimary" className="value">
              {humidity}%
            </Typography>
          </Box>
          <Box className="DisplayCard__AdditionalInfoItem">
            <Typography variant="body1" color="textPrimary" className="label">
              Pressure
            </Typography>
            <Typography variant="body1" color="textPrimary" className="value">
              {pressure} pa
            </Typography>
          </Box>
          <Box className="DisplayCard__AdditionalInfoItem">
            <Typography variant="body1" color="textPrimary" className="label">
              Wind
            </Typography>
            <Typography variant="body1" color="textPrimary" className="value">
              {wind} km/h
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </div>
  );
}

export default Display;
