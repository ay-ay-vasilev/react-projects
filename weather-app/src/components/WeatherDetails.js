import React from "react";
// MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// Custom components
import WeatherGraph from "./WeatherGraph";

export default function WeatherDetails(props) {
  const classes = props.classes;

  let icon;
  let timePeriod =
    props.date.time < 9
      ? Math.floor((props.date.time - 9) / 3) + 8
      : Math.floor((props.date.time - 9) / 3);
  let humidity = "???";
  let wind = "???";
  let weather = "???";
  let curTemp = "?";
  let weatherGraph = "";

  if (typeof props.info != "undefined") {
    curTemp = Math.round(
      props.info.weather.map((item) => item.main.feels_like)[timePeriod] -
        273.15
    );
    weather = icon = props.info.weather.map((item) => item.weather[0].main)[
      timePeriod
    ];
    icon = props.info.weather.map((item) => item.weather[0].icon)[timePeriod];
    humidity = props.info.weather.map((item) => item.main.humidity)[timePeriod];
    wind = props.info.weather.map((item) => item.wind.speed)[timePeriod];
    weatherGraph = <WeatherGraph info={props.info} />;
  } else {
    icon = "none";
  }

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container direction="column">
        <Grid item>
          <Typography variant="h5">{props.addr}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">
            {props.date.day} {props.date.time % 12}:00{" "}
            {props.date.time < 12 ? "AM" : "PM"}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">{weather}</Typography>
        </Grid>
      </Grid>

      <Grid item container direction="row">
        <Grid
          item
          container
          justify="flex-start"
          direction="row"
          spacing={1}
          xs={6}
        >
          <Grid item style={{ paddingTop: "8pt" }}>
            <img
              alt="?"
              src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
              className={classes.weatherIconBig}
            />
          </Grid>
          <Grid item>
            <Typography variant="h3" style={{ fontSize: "50pt" }}>
              {curTemp}
            </Typography>
          </Grid>
          <Grid item style={{ paddingTop: "11pt" }}>
            <Typography>°C</Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="column"
          justify="center"
          spacing={2}
          xs={6}
        >
          <Grid item container direction="column">
            <Grid item>
              <Typography variant="body2">Humidity: {humidity}%</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">Wind: {wind} m/s</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container item direction="column">
        <Grid item>{weatherGraph}</Grid>
        <Typography variant="body2">
          <Grid
            className={classes.grayCenterText}
            container
            item
            direction="row"
          >
            <Grid xs item>
              9 AM
            </Grid>
            <Grid xs item>
              12 PM
            </Grid>
            <Grid xs item>
              3 PM
            </Grid>
            <Grid xs item>
              6 PM
            </Grid>
            <Grid xs item>
              9 PM
            </Grid>
            <Grid xs item>
              12 AM
            </Grid>
            <Grid xs item>
              3 AM
            </Grid>
          </Grid>
        </Typography>
      </Grid>
    </Grid>
  );
}
