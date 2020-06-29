import React from "react";
import Grid from "@material-ui/core/Grid";
import InfoCard from "./InfoCard";

export default function Info() {
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

  const infoCards = cities.map((city) => <InfoCard location={city} />);

  return (
    <Grid container spacing={4}>
      {infoCards}
    </Grid>
  );
}
