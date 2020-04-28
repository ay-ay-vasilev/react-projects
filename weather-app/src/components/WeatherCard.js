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
// Weather icons
import sunny from "../images/sunny.png";
import cloud from "../images/cloud.png";
import cloudy from "../images/cloudy.png";
import lightning from "../images/lightning.png";
import mooncloud from "../images/mooncloud.png";
import moon from "../images/moon.png";
import rain from "../images/rain.png";
import rainbow from "../images/rainbow.png";
import snow from "../images/snow.png";
import sun from "../images/sun.png";

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

export default function WeatherCard(props) {
  const classes = useStyles();
  const { date, weather, maxTemp, minTemp } = props;
  let weatherIcon;

  switch (weather) {
    case 0:
      weatherIcon = sunny;
      break;
    case 1:
      weatherIcon = cloud;
      break;
    case 2:
      weatherIcon = cloudy;
      break;
    case 3:
      weatherIcon = lightning;
      break;
    case 4:
      weatherIcon = moon;
      break;
    case 5:
      weatherIcon = mooncloud;
      break;
    case 6:
      weatherIcon = rain;
      break;
    case 7:
      weatherIcon = rainbow;
      break;
    case 8:
      weatherIcon = snow;
      break;
    default:
      weatherIcon = sun;
      break;
  }

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
          <CardMedia className={classes.weatherIcon} image={weatherIcon} />
        </div>
        <CardContent>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Typography variant="body2">{maxTemp}°</Typography>
            </Grid>
            <Grid item className={classes.grayText}>
              <Typography variant="body2">{minTemp}°</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Box>
  );
}
