import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { alpha, useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";

import NavItem from "./NavItem";
import { PageItem } from "../../types/types";

interface Props {
  onSidebarOpen: () => void;
  pages: {
    learn: Array<PageItem>;
  };
}

const Navbar = ({ onSidebarOpen, pages }: Props): JSX.Element => {
  const theme = useTheme();

  const { learn: learnPages } = pages;

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      width={1}
    >
      <Box
        display={"flex"}
        component="a"
        href="/"
        title="coinbase"
        width={{ xs: 100, md: 120 }}
      >
        <Box
          component={"img"}
          src={
            "https://images.ctfassets.net/q5ulk4bp65r7/3TBS4oVkD1ghowTqVQJlqj/2dfd4ea3b623a7c0d8deb2ff445dee9e/Consumer_Wordmark.svg"
          }
          height={1}
          width={1}
        />
      </Box>
      <Box sx={{ display: { xs: "none", md: "flex" } }} alignItems={"center"}>
        <Box>
          <NavItem title={"Learn"} id={"learn-pages"} items={learnPages} />
        </Box>
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "stretched", sm: "flex-start" }}
          marginLeft={4}
        >
          <Button
            variant="outlined"
            color="primary"
            component="a"
            target="blank"
            href="/"
            size="large"
          >
            Sign In
          </Button>
          <Box marginLeft={{ sm: 2 }} width={{ xs: "100%", md: "auto" }}>
            <Button
              variant="contained"
              color="primary"
              component="a"
              target="blank"
              href="/"
              size="large"
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: { xs: "flex", md: "none" } }} alignItems={"center"}>
        <Button
          onClick={() => onSidebarOpen()}
          aria-label="Menu"
          variant={"outlined"}
          sx={{
            borderRadius: 2,
            minWidth: "auto",
            padding: 1,
            borderColor: alpha(theme.palette.divider, 0.2),
          }}
        >
          <MenuIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default Navbar;
