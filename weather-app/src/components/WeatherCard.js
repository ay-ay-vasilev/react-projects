import React from "react";
import dayjs from "dayjs";
// MUI
import Box from "@material-ui/core/Box";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  weatherCard: {
    width: theme.spacing(14),
    height: theme.spacing(20),
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
  const classes = useStyles();
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
    <Box className={classes.weatherCard} color="#000000">
      <CardActionArea>
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
      </CardActionArea>
    </Box>
  );
}
