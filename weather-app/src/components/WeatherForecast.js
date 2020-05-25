import React, { useState, useEffect } from "react";
import Geocode from "react-geocode";
import dayjs from "dayjs";
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
    width: theme.spacing(14) * 5,
    height: theme.spacing(18) * 4,
    padding: theme.spacing(2),
    spacing: theme.spacing(2),
  },
}));

export default function WeatherForecast() {
  const [addr, setAddr] = useState("");
  const [forecast, setForecast] = useState("");

  const getPosition = () => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const getWeather = async (position) => {
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
    Geocode.setLanguage("en");
    Geocode.setRegion("kr");

    Geocode.fromLatLng(
      position.coords.latitude,
      position.coords.longitude
    ).then(
      (response) => {
        setAddr(
          response.results[0].address_components[2].short_name +
            ", " +
            response.results[0].address_components[3].short_name
        );
      },
      (error) => {
        console.error(error);
      }
    );

    const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
    );
    const data = await api_call.json();
    setForecast(data);
  };

  useEffect(() => {
    getPosition().then((position) => {
      getWeather(position);
    });
  }, []);

  console.log(forecast);

  const classes = useStyles();
  const today = new Date();
  const date = {
    day: dayjs(today).format("dddd"),
    time:
      dayjs(today).format("Z A").slice(1)[0] === "0"
        ? dayjs(today).format("Z A").slice(2)
        : dayjs(today).format("Z A").slice(1),
  };

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

  for (let i = 0; i < 5; i++) {
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
          <WeatherDetails addr={addr} date={date} weather={sun} />
        </Grid>

        <Grid item style={{ margin: "auto" }}>
          weather graph?
        </Grid>
      </Grid>
    </Card>
  );
}
