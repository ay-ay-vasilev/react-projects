import React from "react";
// Custom components
import WeatherCard from "./components/WeatherCard";
// MUI
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
// weather images
import sunny from "./images/sunny.png";
import cloud from "./images/cloud.png";
import cloudy from "./images/cloudy.png";
import lightning from "./images/lightning.png";
import mooncloud from "./images/mooncloud.png";
import moon from "./images/moon.png";
import rain from "./images/rain.png";
import rainbow from "./images/rainbow.png";
import snow from "./images/snow.png";
import sun from "./images/sun.png";

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
    sun,
  ];

  for (let i = 0; i < 8; i++) {
    const newDate = new Date(today.getTime() + i * 86400000);

    dayCards.push({
      date: newDate,
      weather: weathers[i],
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
              <Typography variant="subtitle1">Tuesday</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Sunny</Typography>
            </Grid>
          </Grid>
          <Grid item container direction="row">
            <Grid
              item
              container
              justify="flex-start"
              direction="row"
              alignItems="center"
              spacing={1}
              xs={6}
            >
              <Grid item>
                <CardMedia
                  image={sunny}
                  style={{
                    height: "60px",
                    width: "60px",
                    alignSelf: "center",
                    justify: "center",
                  }}
                />
              </Grid>

              <Grid item>
                <Typography variant="h2">22</Typography>
              </Grid>
              <Grid item>
                <Typography>°C</Typography>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              More weather info
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{ margin: "auto" }}>
          weather graph?
        </Grid>
      </Grid>
    </Card>
  );
}
