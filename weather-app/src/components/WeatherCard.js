import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
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

export default function WeatherCard(props) {
  return (
    <Card className={props.classes.weatherCard}>
      <CardHeader
        classes={{
          title: props.classes.grayText,
        }}
        title="Wed"
        titleTypographyProps={{ variant: "body2" }}
        style={{ textAlign: "center" }}
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CardMedia className={props.classes.weatherIcon} image={sunny} />
      </div>
      <CardContent>
        <Typography variant="body2">
          <Grid container spacing={2} justify="center">
            <Grid item>73°</Grid>
            <Grid item className={props.classes.grayText}>
              68°
            </Grid>
          </Grid>
        </Typography>
      </CardContent>
    </Card>
  );
}
