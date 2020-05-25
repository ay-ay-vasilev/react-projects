import React, { useState, useEffect } from "react";
import Geocode from "react-geocode";
// MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";

const fetchForecast = async (city) => {
  try {
    const api_call = await fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&appid=" +
        process.env.REACT_APP_OPEN_WEATHER_API_KEY
    );
    const data = await api_call.json();
    console.log(city);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export default function WeatherDetails(props) {
  const [addr, setAddr] = useState("");
  const [forecast, setForecast] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
      Geocode.setLanguage("en");
      Geocode.setRegion("kr");

      Geocode.fromLatLng(
        position.coords.latitude,
        position.coords.longitude
      ).then(
        (response) => {
          setAddr(
            response.results[0].address_components[2].short_name +
              ", " +
              response.results[0].address_components[3].short_name
          );
          setForecast(
            fetchForecast(response.results[0].address_components[3].short_name)
          );
        },
        (error) => {
          console.error(error);
        }
      );
    });
  });

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container direction="column">
        <Grid item>
          <Typography variant="h5">{addr}</Typography>
        </Grid>
        <Grid item style={{ color: "#aaaaaa" }}>
          <Typography variant="body2">
            {props.date.day} {props.date.time}
          </Typography>
        </Grid>
        <Grid item style={{ color: "#aaaaaa" }}>
          <Typography variant="body2">Sunny</Typography>
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
            <CardMedia
              image={props.weather}
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
              22
            </Typography>
          </Grid>
          <Grid item style={{ paddingTop: "11pt" }}>
            <Typography>°C</Typography>
          </Grid>
        </Grid>
        <Grid item container direction="column" spacing={2} xs={6}>
          <Grid item container direction="column" style={{ color: "#aaaaaa" }}>
            <Grid item>
              <Typography variant="body2">Precipitation: </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">Humidity: </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">Wind: </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Grid item>
              <button>Temperature</button>
              <button>Precipitation</button>
              <button>Wind</button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
