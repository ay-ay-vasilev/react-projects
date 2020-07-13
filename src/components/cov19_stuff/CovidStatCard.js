import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
// MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// Custom components
import CovidValue from "./CovidValue";

export default function CovidStatCard(props) {
  const [stats, setStats] = useState("");

  const getCovidCityStats = async () => {
    const api_call = await fetch(
      `https://www.trackcorona.live/api/cities/${props.area}`
    );
    const data = await api_call.json();
    setStats(data.data[0]);
  };

  useEffect(() => {
    getCovidCityStats();
  }, []);

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item style={{ alignSelf: "center" }}>
        <Typography variant="h3">{stats.location}</Typography>
      </Grid>

      <CovidValue
        label="Total infected"
        value={stats.confirmed}
        velocity={stats.velocity_confirmed}
        color="#EC6E4C"
        size="h4"
      />

      <Grid item container direction="row">
        <CovidValue
          label="Deaths"
          value={stats.dead}
          velocity={stats.velocity_dead}
          color="#EC6E4C"
          size="h6"
        />

        <CovidValue
          label="Current infected"
          value={stats.confirmed - stats.dead - stats.recovered}
          velocity={
            stats.velocity_confirmed -
            stats.velocity_dead -
            stats.velocity_recovered
          }
          color={
            stats.velocity_confirmed -
              stats.velocity_dead -
              stats.velocity_recovered >
            0
              ? "#EC6E4C"
              : "#40A90D"
          }
          size="h6"
        />

        <CovidValue
          label="Recoveries"
          value={stats.recovered}
          velocity={stats.velocity_recovered}
          color="#40A90D"
          size="h6"
        />
      </Grid>

      <Grid item style={{ alignSelf: "center" }}>
        <Typography variant="h6">
          Update from: {dayjs(stats.updated).format("DD.MM.YYYY")}
        </Typography>
      </Grid>
    </Grid>
  );
}
