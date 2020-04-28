import React from "react";
// Custom components
import WeatherCard from "./components/WeatherCard";
// MUI
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  forecast: {
    margin: "auto",
    width: theme.spacing(14) * 8,
    height: theme.spacing(18) * 4,
    padding: theme.spacing(2),
    spacing: theme.spacing(2),
  },
}));

export default function App() {
  const classes = useStyles();

  const today = new Date();

  let dayCards = [];

  for (let i = 0; i < 8; i++) {
    const newDate = new Date(today.getTime() + i * 86400000);

    dayCards.push({
      date: newDate,
      weather: i,
      maxTemp: 70 + i,
      minTemp: 70 - i,
    });
  }

  let dayCardComponents = dayCards.map((dayCard) => (
    <WeatherCard
      key={dayCard.date}
      date={dayCard.date}
      weather={dayCard.weather}
      maxTemp={dayCard.maxTemp}
      minTemp={dayCard.minTemp}
    />
  ));

  return (
    <Card className={classes.forecast}>
      <Grid
        container
        justify="space-between"
        direction="column"
        style={{ width: "100%", height: "100%" }}
      >
        <Grid item container justify="center" direction="column" spacing={2}>
          <Grid item container direction="row" justify="center">
            {dayCardComponents}
          </Grid>
          <Grid item container justify="flex-start" direction="column">
            <Grid item xs={12}>
              <Typography variant="h5">
                Jangjeon-dong, Geumjeong-gu, Busan
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Tuesday 5:00 PM</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Tuesday 5:00 PM</Typography>
            </Grid>
          </Grid>
          <Grid item container justify="space-between" direction="row">
            <Grid item>current weather</Grid>
            <Grid item>More weather info</Grid>
          </Grid>
        </Grid>
        <Grid item style={{ margin: "auto" }}>
          weather graph?
        </Grid>
      </Grid>
    </Card>
  );
}
