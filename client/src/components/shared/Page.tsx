import React, { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";
import getTheme from "../theme";
import AOS from "aos";

interface Props {
  children: React.ReactNode;
}

export default function Page({ children }: Props): JSX.Element {
  useEffect(() => {
    AOS.init({
      once: true,
      delay: 50,
      duration: 500,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <ThemeProvider theme={getTheme()}>
      <CssBaseline />
      <Paper elevation={0}>{children}</Paper>
    </ThemeProvider>
  );
}
