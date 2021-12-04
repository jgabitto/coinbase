import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { connect } from "react-redux";

import Main from "../../common/Main";
import { StoreState } from "../../../state/reducers";
import Jumbotron from "./Jumbotron";
import Table from "../../Table";
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
  }, []);

  console.log(cryptoInfo);

  return (
    <Box sx={{ overflowX: "hidden" }}>
      <Main bgcolor={"background.paper"}>
        <Jumbotron />
        <Table />
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
