import React from "react";
// MUI
import Grid from "@material-ui/core/Grid";
// Custom
import InfoCard from "./InfoCard";
// styles
import styles from "../styles/styles"


export default function Info() {
  const classes = styles();

  console.log(classes)
  console.log(styles())

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
