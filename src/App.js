import React from "react";
// Material UI
import AppBar from "@material-ui/core/AppBar"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
// Custom components
import Info from "./components/Info";
import Test from "./components/Test";

export default function App() {
  return <React.Fragment>
    <AppBar style={{margin: 'auto', height: 80, backgroundColor: '#EC6E4C', justifyContent: "center", alignItems: "center"}}>
        <Typography variant="h6">
          COVID statistics
        </Typography>
    </AppBar>
    <Container style={{marginTop: 80, padding: 25}}>
    <Info/>
    </Container>
    </React.Fragment>;
}
