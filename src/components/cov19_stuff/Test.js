import React from "react";
import Card from "@material-ui/core/Card";

export default function Test() {
  const getCovidCityStats = async (cityName) => {
    const api_call = await fetch(
      `https://www.trackcorona.live/api/cities/${cityName}`
    );
    const data = await api_call.json();

    console.log(data.data[0]);
  };

  const yakutia = getCovidCityStats("Yakutia");
  const busan = getCovidCityStats("Busan");
  const daegu = getCovidCityStats("Daegu");

  return <Card>LOL</Card>;
}
