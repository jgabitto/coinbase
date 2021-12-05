import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import NavItem from "../Navbar/NavItem";
import { PageItem } from "../interfaces/interfaces";

interface Props {
  pages: {
    learn: Array<PageItem>;
  };
}

const SidebarNav = ({ pages }: Props): JSX.Element => {
  const { learn: learnPages } = pages;

  return (
    <Box>
      <Box width={1} paddingX={2} paddingY={1}>
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
      </Box>
      <Box paddingX={2} paddingY={2}>
        <Box>
          <NavItem title={"Learn"} items={learnPages} />
        </Box>
        <Box marginTop={2}>
          <Button
            size={"large"}
            variant="outlined"
            fullWidth
            component="a"
            href="/"
          >
            Sign In
          </Button>
        </Box>
        <Box marginTop={1}>
          <Button
            size={"large"}
            variant="contained"
            color="primary"
            fullWidth
            component="a"
            target="blank"
            href="/"
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarNav;
