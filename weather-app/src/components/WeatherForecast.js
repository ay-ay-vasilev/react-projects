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
import clear from "../images/sun.png";

const useStyles = makeStyles((theme) => ({
  forecastStyle: {
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

  const pickWeatherPic = (weather) => {
    let pic;
    switch (weather) {
      case "Clouds":
        pic = cloudy;
        break;
      case "Clear":
        pic = clear;
        break;
      case "Drizzle":
        pic = rainbow;
        break;
      case "Rain":
        pic = rain;
        break;
      case "Snow":
        pic = snow;
        break;
      case "Thunderstorm":
        pic = lightning;
        break;
      default:
        pic = rainbow;
        break;
    }
    return pic;
  };

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
    clear,
  ];

  if (forecast !== "") {
    if (forecast.list.length > 0) {
      console.log(forecast.list);

      for (let i = 0; i < 5; i++) {
        const newDate = new Date(today.getTime() + i * 86400000);

        dayCards.push({
          date: newDate,
          reportHours: [9, 12, 15, 18, 21, 0, 3, 6],
          weather: [
            pickWeatherPic(forecast.list[i * 8].weather[0].main),
            pickWeatherPic(forecast.list[i * 8 + 1].weather[0].main),
            pickWeatherPic(forecast.list[i * 8 + 2].weather[0].main),
            pickWeatherPic(forecast.list[i * 8 + 3].weather[0].main),
            pickWeatherPic(forecast.list[i * 8 + 4].weather[0].main),
            pickWeatherPic(forecast.list[i * 8 + 5].weather[0].main),
            pickWeatherPic(forecast.list[i * 8 + 6].weather[0].main),
            pickWeatherPic(forecast.list[i * 8 + 7].weather[0].main),
          ],
          maxTemp: [
            forecast.list[i * 8].main.temp_max,
            forecast.list[i * 8 + 1].main.temp_max,
            forecast.list[i * 8 + 2].main.temp_max,
            forecast.list[i * 8 + 3].main.temp_max,
            forecast.list[i * 8 + 4].main.temp_max,
            forecast.list[i * 8 + 5].main.temp_max,
            forecast.list[i * 8 + 6].main.temp_max,
            forecast.list[i * 8 + 7].main.temp_max,
          ],
          minTemp: [
            forecast.list[i * 8].main.temp_min,
            forecast.list[i * 8 + 1].main.temp_min,
            forecast.list[i * 8 + 2].main.temp_min,
            forecast.list[i * 8 + 3].main.temp_min,
            forecast.list[i * 8 + 4].main.temp_min,
            forecast.list[i * 8 + 5].main.temp_min,
            forecast.list[i * 8 + 6].main.temp_min,
            forecast.list[i * 8 + 7].main.temp_min,
          ],
        });
        console.log(dayCards);
      }
    }
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
    <Card className={classes.forecastStyle}>
      <Grid
        container
        justify="space-between"
        direction="column"
        style={{ width: "100%", height: "100%" }}
      >
        <Grid item>
          <WeatherDetails addr={addr} date={date} weather={clear} />
        </Grid>

        <Grid item style={{ margin: "auto" }}>
          weather graph?
        </Grid>

        <Grid item container direction="row" justify="center">
          {dayCardComponents}
        </Grid>
      </Grid>
    </Card>
  );
}
