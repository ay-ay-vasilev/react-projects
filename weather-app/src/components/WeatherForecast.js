import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Geocode from "react-geocode";
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
  weatherCard: {
    width: theme.spacing(14),
    height: theme.spacing(20),
  },
  weatherIcon: {
    height: theme.spacing(6),
    width: theme.spacing(6),
    alignSelf: "center",
    justify: "center",
  },
  weatherIconBig: {
    height: theme.spacing(8),
    width: theme.spacing(8),
    alignSelf: "center",
    justify: "center",
  },
  grayCenterText: {
    textAlign: "center",
    color: "#aaaaaa",
  },
  grayText: {
    color: "#aaaaaa",
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

  let dayCards = [];

  if (forecast !== "") {
    if (forecast.list.length > 0) {
      for (let i = 0; i < 5; i++) {
        const newDate = new Date(today.getTime() + i * 86400000);

        dayCards.push({
          date: newDate,
          weather: forecast.list.slice(i * 8, i * 8 + 7),
        });
      }
    }
  }

  let id = 0;
  let dayCardComponents = dayCards.map((dayCard) => (
    <WeatherCard info={dayCard} id={id} classes={classes} key={id++} />
  ));

  id = 0;
  let dailyDetails = dayCards.map((dayCard) => (
    <Route path={`/${id++}`} key={id}>
      <WeatherDetails addr={addr} info={dayCard} classes={classes} key={id} />
    </Route>
  ));

  return (
    <Router>
      <Card className={classes.forecastStyle}>
        <Grid
          container
          justify="space-between"
          direction="column"
          style={{ width: "100%", height: "100%" }}
        >
          <Switch>
            <Route exact path="/">
              <Redirect to="/0" />
            </Route>
            {dailyDetails}
          </Switch>

          <Grid item container direction="row" justify="center">
            {dayCardComponents}
          </Grid>
        </Grid>
      </Card>
    </Router>
  );
}
