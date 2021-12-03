import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

const Footer = (): JSX.Element => {
  const theme = useTheme();
  const { mode } = theme.palette;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          width={1}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <Box
            display={"flex"}
            component="a"
            href="/"
            title="coinbase"
            width={80}
          >
            <Box
              marginTop={1}
              component={"img"}
              src={
                "https://images.ctfassets.net/q5ulk4bp65r7/3TBS4oVkD1ghowTqVQJlqj/2dfd4ea3b623a7c0d8deb2ff445dee9e/Consumer_Wordmark.svg"
              }
              height={1}
              width={1}
            />
          </Box>
          <Box display="flex" flexWrap={"wrap"} alignItems={"center"}>
            <Box marginTop={1} marginRight={2}>
              <Link
                underline="none"
                component="a"
                href="/"
                color="text.primary"
                variant={"subtitle2"}
              >
                Home
              </Link>
            </Box>
            <Box marginTop={1} marginRight={2}>
              <Link
                underline="none"
                component="a"
                href="/learn"
                color="text.primary"
                variant={"subtitle2"}
              >
                Learn
              </Link>
            </Box>
            <Box
              marginTop={1}
              display="flex"
              flexDirection={{ xs: "row", sm: "row" }}
              alignItems={{ xs: "stretched", sm: "flex-start" }}
            >
              <Button
                variant="outlined"
                color="primary"
                component="a"
                target="blank"
                href="/"
                size="small"
              >
                Sign In
              </Button>
              <Box marginLeft={{ xs: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  component="a"
                  target="blank"
                  href="/"
                  size="small"
                >
                  Sign Up
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Footer;
