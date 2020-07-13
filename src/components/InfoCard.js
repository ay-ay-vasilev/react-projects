import React from "react";
import WeatherForecast from "./weather_stuff/WeatherForecast";
import CovidStatCard from "./cov19_stuff/CovidStatCard";

import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

export default function InfoCard(props) {
  return (
    <Card className={props.classes.infoCardStyle}>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <CovidStatCard area={props.location.area} />
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item>
          <WeatherForecast classes={props.classes} position={props.location} />
        </Grid>
      </Grid>
    </Card>
  );
}
