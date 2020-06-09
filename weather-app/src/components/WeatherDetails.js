import React from "react";
// MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export default function WeatherDetails(props) {
  let icon;
  let timePeriod =
    props.date.time < 9
      ? Math.floor((props.date.time - 9) / 3) + 8
      : Math.floor((props.date.time - 9) / 3);
  let humidity = "???";
  let wind = "???";
  let weather = "???";
  let curTemp = "?";

  console.log("TIMEPERIOD", timePeriod);

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
  } else {
    icon = "none";
  }

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container direction="column">
        <Grid item>
          <Typography variant="h5">{props.addr}</Typography>
        </Grid>
        <Grid item style={{ color: "#000000" }}>
          <Typography variant="body2">
            {props.date.day} {props.date.time % 12}:00{" "}
            {props.date.time < 12 ? "AM" : "PM"}
          </Typography>
        </Grid>
        <Grid item style={{ color: "#000000" }}>
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
              alt="404"
              src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
              style={{
                height: "60px",
                width: "60px",
                alignSelf: "center",
                justify: "center",
              }}
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
        <Grid item container direction="column" spacing={2} xs={6}>
          <Grid item container direction="column" style={{ color: "#000000" }}>
            <Grid item>
              <Typography variant="body2">Humidity: {humidity}%</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">Wind: {wind} m/s</Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Grid item>
              <button>Temperature</button>
              <button>Wind</button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
