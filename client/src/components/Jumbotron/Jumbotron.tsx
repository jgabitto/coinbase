import React from "react";
import Typed from "react-typed";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { alpha, useTheme } from "@mui/material/styles";
import { Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";

import Container from "../shared/Container";
import Background from "../theme/assets/background.png";

const typedStrings = ["BTC", "ETH", "BNB", "DOGE", "SHIB", "CRO"];

const Jumbotron = (): JSX.Element => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  return (
    <Box
      sx={{
        backgroundImage: "url(" + Background + ")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Box paddingY={{ xs: 0, sm: "4rem", md: "8rem" }}>
        <Container>
          <Box maxWidth={{ xs: 1, sm: "50%" }}>
            <Typography
              variant="h2"
              color="text.primary"
              gutterBottom
              sx={{
                fontWeight: 700,
              }}
            >
              Get the information you need
              <br />
              about{" "}
              <Typography
                color={"primary"}
                component={"span"}
                variant={"inherit"}
                sx={{
                  background: `linear-gradient(180deg, transparent 82%, ${alpha(
                    theme.palette.primary.main,
                    0.3
                  )} 0%)`,
                }}
              >
                <Typed strings={typedStrings} typeSpeed={80} loop={true} />
              </Typography>
            </Typography>
            <Typography
              variant="h6"
              component="p"
              color="text.primary"
              sx={{ fontWeight: 400 }}
            >
              Start investing or managing your investments today.
            </Typography>
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "stretched", sm: "flex-start" }}
              marginTop={4}
            >
              <Button
                component={"a"}
                variant="contained"
                color="primary"
                size="large"
                fullWidth={isMd ? false : true}
                href={"/home"}
              >
                View Our Currency Table
              </Button>
            </Box>
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "stretched", sm: "flex-start" }}
              marginTop={4}
            >
              <Card
                sx={{
                  minWidth: 200,
                  backgroundColor: "transparent",
                  boxShadow: "0",
                  marginRight: 4,
                }}
              >
                <CardContent>
                  <Typography
                    sx={{ fontSize: 20, fontWeight: "bold" }}
                    color="text.primary"
                    gutterBottom
                  >
                    BITCOIN
                  </Typography>
                  <Typography variant="h5" component="div"></Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.primary">
                    29822.29$
                  </Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  minWidth: 200,
                  backgroundColor: "transparent",
                  boxShadow: "0",
                  marginRight: 4,
                }}
              >
                <CardContent>
                  <Typography
                    sx={{ fontSize: 20, fontWeight: "bold" }}
                    color="text.primary"
                    gutterBottom
                  >
                    ETHERIUM
                  </Typography>
                  <Typography variant="h5" component="div"></Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.primary">
                    29822.29$
                  </Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  minWidth: 200,
                  backgroundColor: "transparent",
                  boxShadow: "0",
                  marginRight: 4,
                }}
              >
                <CardContent>
                  <Typography
                    sx={{ fontSize: 20, fontWeight: "bold" }}
                    color="text.primary"
                    gutterBottom
                  >
                    DODGE
                  </Typography>
                  <Typography variant="h5" component="div"></Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.primary">
                    29822.29$
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Container>
      </Box>
      <Typography variant="h3" align="center">
        Market trend
      </Typography>
    </Box>
  );
};

export default Jumbotron;
