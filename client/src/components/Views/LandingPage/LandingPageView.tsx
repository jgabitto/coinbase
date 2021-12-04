import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

import Main from "../../common/Main";
import { StoreState } from "../../../state/reducers";
import Jumbotron from "./Jumbotron";
import EnhancedTable from "../../Table";
import { fetchCryptoInfo } from "../../../state/action-creators";
import { CryptoInfo } from "../../../state/actions";

interface TableProps {
  cryptoInfo: CryptoInfo[];
  fetchCryptoInfo: Function;
}

const LandingPageView: React.FC<TableProps> = ({
  fetchCryptoInfo,
  cryptoInfo,
}): JSX.Element => {
  useEffect(() => {
    fetchCryptoInfo();
  }, [fetchCryptoInfo]);

  console.log(cryptoInfo);

  return (
    <Box sx={{ overflowX: "hidden" }}>
      <Main bgcolor={"background.paper"}>
        <Jumbotron />
        {cryptoInfo.length === 0 ? (
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "100vh" }}
          >
            <Grid item xs={3}>
              <CircularProgress />
            </Grid>
          </Grid>
        ) : (
          <EnhancedTable data={cryptoInfo} />
        )}
      </Main>
    </Box>
  );
};

const mapStateToProps = ({
  cryptoInfo,
}: StoreState): { cryptoInfo: CryptoInfo[] } => {
  return { cryptoInfo };
};

export default connect(mapStateToProps, { fetchCryptoInfo })(LandingPageView);
