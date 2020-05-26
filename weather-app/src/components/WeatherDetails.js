import React from "react";
// MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";

export default function WeatherDetails(props) {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container direction="column">
        <Grid item>
          <Typography variant="h5">{props.addr}</Typography>
        </Grid>
        <Grid item style={{ color: "#000000" }}>
          <Typography variant="body2">
            {props.date.day} {props.date.time % 12}:00{" "}
            {props.date.time < 12 ? "AM" : "PM"}
          </Typography>
        </Grid>
        <Grid item style={{ color: "#000000" }}>
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
          <Grid item container direction="column" style={{ color: "#000000" }}>
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
