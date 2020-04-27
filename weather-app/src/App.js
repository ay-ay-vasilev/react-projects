import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import sunny from "./images/sunny.png";

const useStyles = makeStyles((theme) => ({
  weatherCard: {
    margin: theme.spacing(1),
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
  weatherIcon: {
    height: theme.spacing(8),
    width: theme.spacing(8),
    alignSelf: "center",
    justify: "center",
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <Grid container spacing={0} justify="center">
      <Grid item>
        <Card className={classes.weatherCard}>
          <CardHeader
            title="Weather 1"
            titleTypographyProps={{ variant: "body2" }}
            style={{ textAlign: "center" }}
          />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CardMedia className={classes.weatherIcon} image={sunny} />
          </div>
        </Card>
      </Grid>
      <Grid item>
        <Card className={classes.weatherCard}>Item 2</Card>
      </Grid>
      <Grid item>
        <Card className={classes.weatherCard}>Item 3</Card>
      </Grid>
    </Grid>
  );
}
