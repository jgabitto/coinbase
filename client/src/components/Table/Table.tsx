import React, { useState } from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";

import Container from "../common/Container";
import PriceChartModal from "../PriceChartModal/PriceChartModal";
import { PricesData, LineChartData } from "../../state/actions";
import { fetchLineChartData } from "../../state/action-creators";
import { ChartColors } from "../Chart/styles/index";
import CoinChart from "../Chart/CoinChart/CoinChart";
import { StoreState } from "../../state/reducers";
import { Order } from "./interfaces";
import EnhancedTableHead from "./TableHeader";
import { getComparator, stableSort } from "./utils";

const CHART_BOX_SIZE = {
  height: 40,
  width: 150,
};

interface TableProps {
  data: any;
  fetchLineChartData: Function;
  lineChartData: LineChartData;
}

const EnhancedTable: React.FC<TableProps> = ({
  data,
  fetchLineChartData,
  lineChartData,
}): JSX.Element => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof PricesData>("market_cap_rank");
  const [selected, setSelected] = useState<string>("");
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<any>();

  const handleClickOpen = (event: React.MouseEvent<unknown>, row: any) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof PricesData
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.checked) {
  //     const newSelecteds = rows.map((n: any) => n.name);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    // const selectedIndex = selected.indexOf(name);
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    // if (selectedIndex === -1) {
    //   newSelected = newSelected.concat(selected, name);
    // } else if (selectedIndex === 0) {
    //   newSelected = newSelected.concat(selected.slice(1));
    // } else if (selectedIndex === selected.length - 1) {
    //   newSelected = newSelected.concat(selected.slice(0, -1));
    // } else if (selectedIndex > 0) {
    //   newSelected = newSelected.concat(
    //     selected.slice(0, selectedIndex),
    //     selected.slice(selectedIndex + 1)
    //   );
    // }

    setSelected(name);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 && data?.length
      ? Math.max(0, (1 + page) * rowsPerPage - data.length)
      : 0;

  return (
    <Container>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                // onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={data?.length}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(data, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const id = typeof row.id === "string" ? row.id : "bitcoin";
                    const name = typeof row.name === "string" ? row.name : "";
                    const oneH =
                      typeof row.price_change_percentage_1h_in_currency ===
                      "number"
                        ? row.price_change_percentage_1h_in_currency
                        : 0;
                    const twentyFourH =
                      typeof row.price_change_percentage_24h === "number"
                        ? row.price_change_percentage_24h
                        : 0;
                    const sevenD =
                      typeof row.price_change_percentage_7d_in_currency ===
                      "number"
                        ? row.price_change_percentage_7d_in_currency
                        : 0;
                    const volume =
                      typeof row.total_volume === "number"
                        ? row.total_volume
                        : 0;
                    const marketCap =
                      typeof row.market_cap === "number" ? row.market_cap : 0;
                    const supply =
                      typeof row.circulating_supply === "number"
                        ? row.circulating_supply
                        : 0;
                    const symbol =
                      typeof row.symbol === "string"
                        ? row.symbol.toUpperCase()
                        : row.symbol;

                    const isItemSelected = isSelected(name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClickOpen(event, row)}
                        // onClick={(event) => handleClick(event, name)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="warning"
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                            icon={<StarOutlineOutlinedIcon />}
                            checkedIcon={<StarOutlinedIcon />}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.market_cap_rank}
                        </TableCell>
                        <TableCell align="right">
                          <img
                            height="20rem"
                            width="20rem"
                            alt="coin img"
                            src={`${row.image}`}
                          />{" "}
                          {row.name}
                          {"\t"}
                          <span style={{ color: "grey" }}>{symbol}</span>
                        </TableCell>
                        <TableCell
                          align="right"
                          style={
                            oneH < 0 ? { color: "red" } : { color: "green" }
                          }
                        >
                          {oneH > 0 && "+"}
                          {oneH.toFixed(2)}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={
                            twentyFourH < 0
                              ? { color: "red" }
                              : { color: "green" }
                          }
                        >
                          {twentyFourH > 0 && "+"}
                          {twentyFourH.toFixed(2)}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={
                            sevenD < 0 ? { color: "red" } : { color: "green" }
                          }
                        >
                          {sevenD > 0 && "+"}
                          {sevenD.toFixed(2)}
                        </TableCell>
                        <TableCell align="right">
                          ${volume.toLocaleString()}
                        </TableCell>
                        <TableCell align="right">
                          ${marketCap.toLocaleString()}
                        </TableCell>
                        <TableCell align="right">
                          {supply.toLocaleString()}
                        </TableCell>
                        <TableCell align="right">
                          <CoinChart
                            height={CHART_BOX_SIZE.height}
                            width={CHART_BOX_SIZE.width}
                            color={
                              Math.sign(sevenD) >= 0
                                ? ChartColors.green
                                : ChartColors.red
                            }
                            id={id}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>
      {selectedRow && (
        <PriceChartModal
          open={open}
          handleClose={handleClose}
          setOpen={setOpen}
          row={selectedRow}
          chartDimensions={CHART_BOX_SIZE}
          data={selectedRow.price_change_percentage_7d_in_currency}
          id={selectedRow.id}
        />
      )}
    </Container>
  );
};

// export default EnhancedTable;

const mapStateToProps = ({
  lineChartData,
}: StoreState): { lineChartData: LineChartData } => {
  return { lineChartData };
};

export default connect(mapStateToProps, {
  fetchLineChartData,
})(EnhancedTable);
