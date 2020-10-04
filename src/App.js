import React from "react";
// Material UI
import AppBar from "@material-ui/core/AppBar"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
// Custom components
import Info from "./components/Info";

export default function App() {
  return <React.Fragment>
    <div style={{backgroundColor: "#fafafa"}}>
    <AppBar style={{margin: 'auto', height: 80, backgroundColor: '#EC6E4C', justifyContent: "center", alignItems: "center"}}>
        <Typography variant="h4">
          InfoCards
        </Typography>
    </AppBar>
    <Container style={{marginTop: 80, padding: 25}}>
    <Info/>
    </Container>
    </div>
    </React.Fragment>;
}
