import React from "react";
import Geocode from "react-geocode";
// MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";

const state = {
  location: null,
};

function getLocation() {
  navigator.geolocation.getCurrentPosition(function (position) {
    Geocode.setApiKey("AIzaSyACwlaLUtrw5gW_6gwL_WVOYXyw3CF7ubc");
    Geocode.setLanguage("en");
    Geocode.setRegion("kr");

    Geocode.fromLatLng(
      position.coords.latitude,
      position.coords.longitude
    ).then(
      (response) => {
        const address = response.results[0].formatted_address;
        console.log(address);
      },
      (error) => {
        console.error(error);
      }
    );
  });
}

export default function WeatherDetails(props) {
  let addr;

  console.log(getLocation());

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container direction="column">
        <Grid item>
          <Typography variant="h5">{addr}</Typography>
        </Grid>
        <Grid item style={{ color: "#aaaaaa" }}>
          <Typography variant="body2">Tuesday</Typography>
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
