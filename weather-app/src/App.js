import React from "react";
// Custom components
import WeatherCard from "./components/WeatherCard";
// MUI
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  weatherCard: {
    margin: theme.spacing(1),
    width: theme.spacing(14),
    height: theme.spacing(18),
  },
  weatherIcon: {
    height: theme.spacing(6),
    width: theme.spacing(6),
    alignSelf: "center",
    justify: "center",
  },
  grayText: {
    color: "#aaaaaa",
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <Grid container spacing={0} justify="center">
      <Grid item>
        <WeatherCard classes={classes} />
      </Grid>
      <Grid item>
        <WeatherCard classes={classes} />
      </Grid>
      <Grid item>
        <WeatherCard classes={classes} />
      </Grid>
    </Grid>
  );
}
