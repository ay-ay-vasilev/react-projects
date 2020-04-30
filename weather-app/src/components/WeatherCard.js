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
          <CardMedia className={classes.weatherIcon} image={weather} />
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
