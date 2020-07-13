import React from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  testCard: {
    maxWidth: theme.spacing(80),
    width: "100%",
    height: theme.spacing(80),
  },
}));

export default function Test() {
  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Card className={classes.testCard}>Test</Card>
    </Grid>
  );
}
