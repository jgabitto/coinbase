import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { useTheme } from "@mui/material/styles";

import Container from "./Container";
import Navbar from "./Navbar/Navbar";
import pages from "./Navbar/pages";

interface Props {
  children: React.ReactNode;
  bgcolor?: string;
}

const Main = ({ children, bgcolor = "transparent" }: Props): JSX.Element => {
  const theme = useTheme();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 38,
  });

  return (
    <Box>
      <AppBar
        position={"sticky"}
        sx={{
          top: 0,
          backgroundColor: trigger ? theme.palette.background.paper : bgcolor,
        }}
        elevation={trigger ? 1 : 0}
      >
        <Container paddingY={1}>
          <Navbar pages={pages} />
        </Container>
      </AppBar>
      <main>
        {children}
        <Divider />
      </main>
    </Box>
  );
};

export default Main;
