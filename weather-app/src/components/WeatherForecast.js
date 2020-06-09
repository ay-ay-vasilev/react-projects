import React, { useState, useEffect } from "react";
import Geocode from "react-geocode";
import dayjs from "dayjs";
import Test from "./Test";
// Custom components
import WeatherCard from "./WeatherCard";
import WeatherDetails from "./WeatherDetails";
// MUI
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  forecastStyle: {
    margin: "auto",
    width: theme.spacing(14) * 5,
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
  const getWeatherAndLocation = async (position) => {
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
    Geocode.setLanguage("en");
    Geocode.setRegion("kr");

    Geocode.fromLatLng(
      position.coords.latitude,
      position.coords.longitude
    ).then(
      async (response) => {
        setAddr(
          response.results[0].address_components[1].short_name +
            ", " +
            response.results[0].address_components[2].short_name +
            ", " +
            response.results[0].address_components[3].short_name
        );

        const api_call = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${response.results[0].address_components[3].short_name}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
        );
        const data = await api_call.json();
        setForecast(data);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  useEffect(() => {
    getPosition().then((position) => {
      getWeatherAndLocation(position);
    });
  }, []);

  const classes = useStyles();
  const today = new Date();
  const date = {
    day: dayjs(today).format("dddd"),
    time: Math.floor(dayjs(today).format("H") / 3) * 3,
  };

  let dayCards = [];

  if (forecast !== "") {
    if (forecast.list.length > 0) {
      console.log(forecast.list);

      for (let i = 0; i < 5; i++) {
        const newDate = new Date(today.getTime() + i * 86400000);

        dayCards.push({
          date: newDate,
          weather: forecast.list.slice(i * 8, i * 8 + 7),
        });
        console.log(dayCards);
      }
    }
  }

  let id = 0;
  let dayCardComponents = dayCards.map((dayCard) => (
    <WeatherCard info={dayCard} key={id++} />
  ));

  console.log(dayCards[0]);

  return (
    <Card className={classes.forecastStyle}>
      <Grid
        container
        justify="space-between"
        direction="column"
        style={{ width: "100%", height: "100%" }}
      >
        <Grid item>
          <WeatherDetails addr={addr} date={date} info={dayCards[0]} />
        </Grid>

        <Grid item>
          <Test />
        </Grid>

        <Grid item container direction="row" justify="center">
          {dayCardComponents}
        </Grid>
      </Grid>
    </Card>
  );
}
