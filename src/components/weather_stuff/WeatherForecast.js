import React, { useState, useEffect, useCallback } from "react";
// Custom components
import WeatherCard from "./WeatherCard";
import WeatherDetails from "./WeatherDetails";
// MUI
import Grid from "@material-ui/core/Grid";

export default function WeatherForecast(props) {
  const [addr, setAddr] = useState("");
  const [forecast, setForecast] = useState("");

  const [selectedDay, setSelectedDay] = useState(0);

  const getWeatherAndLocation = async () => {
    setAddr(props.position.name);

    const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${props.position.lat}&lon=${props.position.lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
    );
    const data = await api_call.json();
    setForecast(data);
  };

  useEffect(() => {
    getWeatherAndLocation();
  }, []);

  const selectDay = useCallback((num) => {
    setSelectedDay(num);
  }, []);

  const today = new Date();

  let dayCards = [];

  if (forecast !== "") {
    if (forecast.list.length > 0) {
      for (let i = 0; i < 5; i++) {
        const newDate = new Date(today.getTime() + i * 86400000);

        dayCards.push({
          date: newDate,
          weather: forecast.list.slice(i * 8, i * 8 + 7),
        });
      }
    }
  }

  let dayCardComponents = dayCards.map((dayCard, index) => (
    <WeatherCard
      key={index}
      id={index}
      info={dayCard}
      classes={props.classes}
      selectFunc={selectDay}
      selected={selectedDay}
    />
  ));

  return (
    <Grid
      container
      justify="space-between"
      direction="column"
      style={{ width: "100%", height: "100%" }}
    >
      <WeatherDetails
        addr={addr}
        info={dayCards[selectedDay]}
        classes={props.classes}
      />
      <Grid item container direction="row" justify="center">
        {dayCardComponents}
      </Grid>
    </Grid>
  );
}
