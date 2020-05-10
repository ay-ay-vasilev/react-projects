import React from "react";
// Custom components
import WeatherCard from "./WeatherCard";
import WeatherDetails from "./WeatherDetails";
// MUI
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
// weather images
import sunny from "../images/sunny.png";
import cloud from "../images/cloud.png";
import cloudy from "../images/cloudy.png";
import lightning from "../images/lightning.png";
import mooncloud from "../images/mooncloud.png";
import moon from "../images/moon.png";
import rain from "../images/rain.png";
import rainbow from "../images/rainbow.png";
import snow from "../images/snow.png";
import sun from "../images/sun.png";

const useStyles = makeStyles((theme) => ({
  forecast: {
    margin: "auto",
    width: theme.spacing(14) * 8,
    height: theme.spacing(18) * 4,
    padding: theme.spacing(2),
    spacing: theme.spacing(2),
  },
}));

export default function WeatherForecast() {
  const classes = useStyles();

  const today = new Date();

  let dayCards = [];
  let weathers = [
    sunny,
    cloud,
    cloudy,
    lightning,
    moon,
    mooncloud,
    rain,
    rainbow,
    snow,
    sun,
  ];

  for (let i = 0; i < 8; i++) {
    const newDate = new Date(today.getTime() + i * 86400000);

    dayCards.push({
      date: newDate,
      weather: weathers[i],
      maxTemp: 70 + i,
      minTemp: 70 - i,
    });
  }

  let dayCardComponents = dayCards.map((dayCard) => (
    <WeatherCard
      info={dayCard}
      key={dayCard.date}
      date={dayCard.date}
      weather={dayCard.weather}
      maxTemp={dayCard.maxTemp}
      minTemp={dayCard.minTemp}
    />
  ));

  navigator.geolocation.getCurrentPosition(function (position) {
    console.log("Latitude is :", position.coords.latitude);
    console.log("Longitude is :", position.coords.longitude);
  });

  return (
    <Card className={classes.forecast}>
      <Grid
        container
        justify="space-between"
        direction="column"
        style={{ width: "100%", height: "100%" }}
      >
        <Grid item container direction="row" justify="center">
          {dayCardComponents}
        </Grid>

        <Grid item>
          <WeatherDetails weather={sun} />
        </Grid>

        <Grid item style={{ margin: "auto" }}>
          weather graph?
        </Grid>
      </Grid>
    </Card>
  );
}
