import React from "react";
import dayjs from "dayjs";
// MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// Custom components
import WeatherGraph from "./WeatherGraph";

export default function WeatherDetails(props) {
  let date = {
    day: "???",
    time: "???",
  };

  let timePeriod;
  let timeText;

  const classes = props.classes;
  let icon;

  let humidity = "???";
  let wind = "???";
  let weather = "???";
  let curTemp = "?";
  let weatherGraph = "";

  let timeLabels = ["9 AM", "12 PM", "3 PM", "6 PM", "9 PM", "12 AM", "3 AM"];

  if (typeof props.info != "undefined") {
    date.day = dayjs(props.info.date).format("dddd");
    date.time = Math.floor(dayjs(props.info.date).format("H") / 3) * 3;

    timePeriod =
      date.time < 9
        ? Math.floor((date.time - 9) / 3) + 8
        : Math.floor((date.time - 9) / 3);

    timeText =
      (date.time % 12).toString() + ":00 " + (date.time < 12 ? "AM" : "PM");

    curTemp = Math.round(
      props.info.weather.map((item) => item.main.temp)[0] - 273.15
    );
    weather = icon = props.info.weather.map((item) => item.weather[0].main)[0];
    icon = props.info.weather.map((item) => item.weather[0].icon)[0];
    humidity = props.info.weather.map((item) => item.main.humidity)[0];
    wind = props.info.weather.map((item) => item.wind.speed)[0];
    weatherGraph = <WeatherGraph info={props.info} />;

    console.log("HEY");

    console.log(
      (date.time % 12).toString() + " " + (date.time < 12 ? "AM" : "PM") ===
        "0 PM" && timeLabels[1] === "12 PM"
    );

    while (
      timeLabels[0] !==
        (date.time % 12).toString() + " " + (date.time < 12 ? "AM" : "PM") &&
      !(
        (date.time % 12).toString() + " " + (date.time < 12 ? "AM" : "PM") ===
          "0 PM" && timeLabels[0] === "12 PM"
      )
    ) {
      timeLabels.unshift(timeLabels.pop());
    }
  } else {
    icon = "none";
  }

  timeLabels = timeLabels.map((time, index) => (
    <Grid key={index} xs item>
      <Typography key={index} variant="body2">
        {time}
      </Typography>
    </Grid>
  ));

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container direction="column">
        <Grid item>
          <Typography variant="h5">{props.addr}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">
            {date.day} {timeText}
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

        <Grid className={classes.grayCenterText} container item direction="row">
          {timeLabels}
        </Grid>
      </Grid>
    </Grid>
  );
}
