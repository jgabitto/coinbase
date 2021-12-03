import React from "react";
import Box from "@mui/material/Box";
import Main from "../../common/Main";
import Jumbotron from "./Jumbotron";

const LandingPageView = (): JSX.Element => {
  return (
    <Box sx={{ overflowX: "hidden" }}>
      <Main bgcolor={"background.paper"}>
        <Jumbotron />
      </Main>
    </Box>
  );
};

export default LandingPageView;
