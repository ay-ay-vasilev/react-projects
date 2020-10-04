import { makeStyles } from "@material-ui/core/styles";

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

  export default useStyles;
  