import React from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
// MUI
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

function mode(array) {
  if (array.length === 0) return null;
  var modeMap = {};
  var maxEl = array[0],
    maxCount = 1;
  for (var i = 0; i < array.length; i++) {
    var el = array[i];
    if (modeMap[el] == null) modeMap[el] = 1;
    else modeMap[el]++;
    if (modeMap[el] > maxCount) {
      maxEl = el;
      maxCount = modeMap[el];
    }
  }
  return maxEl;
}

export default function WeatherCard(props) {
  const classes = props.classes;
  const { date, weather } = props.info;

  const maxT = Math.round(
    Math.max.apply(
      Math,
      weather.map((item) => item.main.temp_max)
    ) - 273.15
  );
  const minT = Math.floor(
    Math.min.apply(
      Math,
      weather.map((item) => item.main.temp_min)
    ) - 273.15
  );
  const icon = mode(weather.map((item) => item.weather[0].icon));

  return (
    <MenuItem style={{ padding: "0" }} component={Link} to={`/${props.id}`}>
      <Box className={classes.weatherCard}>
        <CardHeader
          classes={{
            title: classes.grayText,
          }}
          title={dayjs(date).format("ddd")}
          titleTypographyProps={{ variant: "body2" }}
          style={{ textAlign: "center" }}
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            alt="404"
            className={classes.weatherIcon}
            src={`http://openweathermap.org/img/wn/${icon.slice(0, 2)}d@2x.png`}
          />
        </div>
        <CardContent>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Typography variant="body2">{maxT}°</Typography>
            </Grid>
            <Grid item className={classes.grayText}>
              <Typography variant="body2">{minT}°</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Box>
    </MenuItem>
  );
}
