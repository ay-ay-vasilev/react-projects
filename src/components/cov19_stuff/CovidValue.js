import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export default function CovidValue(props) {
  let value = 0;
  let velocity = 0;

  if (props.value !== undefined) {
    value = numberWithSpaces(props.value);
    velocity =
      (props.velocity < 0 ? "" : "+") + numberWithSpaces(props.velocity);
  }

  return (
    <Grid item container xs direction="column">
      <Grid item style={{ alignSelf: "center" }}>
        <Typography variant={props.size}>{props.label}</Typography>
      </Grid>
      <Grid item style={{ alignSelf: "center" }}>
        <Typography variant={props.size}>{value}</Typography>
      </Grid>
      <Grid item style={{ alignSelf: "center" }}>
        <Typography variant={props.size} style={{ color: props.color }}>
          {velocity}
        </Typography>
      </Grid>
    </Grid>
  );
}
