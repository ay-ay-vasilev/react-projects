import React from "react";
import WeatherForecast from "./weather_stuff/WeatherForecast";
import CovidStatCard from "./cov19_stuff/CovidStatCard";

import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  infoCardStyle: {
    margin: "auto",
    width: theme.spacing(14) * 5,
    padding: theme.spacing(2),
    spacing: theme.spacing(2),
  },
}));

export default function InfoCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.infoCardStyle}>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <CovidStatCard area={props.location.area} />
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item>
          <WeatherForecast position={props.location} />
        </Grid>
      </Grid>
    </Card>
  );
}
