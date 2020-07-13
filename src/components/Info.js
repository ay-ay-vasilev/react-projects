import React from "react";
// MUI
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
// Custom
import InfoCard from "./InfoCard";

const useStyles = makeStyles((theme) => ({
  infoCardWrapper: {
    maxWidth: theme.spacing(80),
    width: "100%",
    alignSelf: "center",
  },
  infoCardStyle: {
    margin: "auto",
    padding: theme.spacing(2),
  },
  forecastStyle: {
    margin: "auto",
    width: theme.spacing(14) * 5,
    padding: theme.spacing(2),
    spacing: theme.spacing(2),
  },
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
  weatherIconBig: {
    height: theme.spacing(8),
    width: theme.spacing(8),
    alignSelf: "center",
    justify: "center",
  },
  grayCenterText: {
    textAlign: "center",
    color: "#aaaaaa",
  },
  grayText: {
    color: "#aaaaaa",
  },
}));

export default function Info() {
  const classes = useStyles();

  const cities = [
    {
      lat: 62.03,
      lon: 129.73,
      name: "Yakutsk",
      area: "Yakutia",
    },
    {
      lat: 35.1028,
      lon: 129.0403,
      name: "Busan",
      area: "Busan",
    },
    {
      lat: 35.8,
      lon: 128.55,
      name: "Daegu",
      area: "Daegu",
    },
  ];

  //   const moscow = {
  //     lat: 55.7558,
  //     lon: 37.6173,
  //     name: "Moscow",
  //     area: "Moscow",
  //   };

  const infoCards = cities.map((city) => (
    <Grid item className={classes.infoCardWrapper}>
      <InfoCard location={city} classes={classes} />{" "}
    </Grid>
  ));

  return (
    <Grid container direction="column" spacing={2}>
      {infoCards}
    </Grid>
  );
}
