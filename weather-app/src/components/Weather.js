import React from "react";
// MUI components
import Grid from "@material-ui/core/Grid";
// Custom components
import WeatherForecast from "./WeatherForecast";

export default function Weather() {
  const yakutsk = {
    lat: 62.03,
    lon: 129.73,
    name: "Yakutsk",
  };

  const busan = {
    lat: 35.1028,
    lon: 129.0403,
    name: "Busan",
  };

  const daegu = {
    lat: 35.8,
    lon: 128.55,
    name: "Daegu",
  };

  return (
    <Grid container spacing={2} justify="center">
      <Grid item>
        <WeatherForecast position={yakutsk} />
      </Grid>

      <Grid item>
        <WeatherForecast position={busan} />
      </Grid>

      <Grid item>
        <WeatherForecast position={daegu} />
      </Grid>
    </Grid>
  );
}
