import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

import Main from "../../shared/Main";
import { StoreState } from "../../../state/reducers";
import Jumbotron from "../../Jumbotron/Jumbotron";
import EnhancedTable from "../../Table/Table";
import { fetchPricesData } from "../../../state/action-creators";
import { PricesData, LineChartData } from "../../../state/actions";

interface TableProps {
  pricesData: PricesData[];
  fetchPricesData: Function;
  lineChartData: LineChartData;
}

const LandingPageView: React.FC<TableProps> = ({
  fetchPricesData,
  pricesData,
  lineChartData,
}): JSX.Element => {
  useEffect(() => {
    fetchPricesData();
  }, [fetchPricesData]);

  console.log(pricesData);

  return (
    <Box sx={{ overflowX: "hidden" }}>
      <Main bgcolor={"background.paper"}>
        <Jumbotron />
        {pricesData.length === 0 && lineChartData ? (
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
          <EnhancedTable data={pricesData} />
        )}
      </Main>
    </Box>
  );
};

const mapStateToProps = ({
  pricesData,
  lineChartData,
}: StoreState): { pricesData: PricesData[]; lineChartData: LineChartData } => {
  return { pricesData, lineChartData };
};

export default connect(mapStateToProps, {
  fetchPricesData,
})(LandingPageView);
