import React from "react";
// Custom components
import WeatherCard from "./components/WeatherCard";
// MUI
import Grid from "@material-ui/core/Grid";

export default function App() {
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
    <Grid container justify="center">
      {dayCardComponents}
    </Grid>
  );
}
