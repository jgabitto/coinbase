import React, { useState } from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { visuallyHidden } from "@mui/utils";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";

import Container from "./common/Container";
import { CryptoInfo } from "../state/actions";

// interface Data {
//   num?: number;
//   name?: string;
//   oneHPercentage?: number;
//   twentyfourHPercentage?: number;
//   sevenDPercentage?: number;
//   twentyfourHVolume?: number;
//   marketCap?: number;
//   circulatingSupply?: number;
// }

// function createData(
//   num?: number,
//   name?: string,
//   oneHPercentage?: number,
//   twentyfourHPercentage?: number,
//   sevenDPercentage?: number,
//   twentyfourHVolume?: number,
//   marketCap?: number,
//   circulatingSupply?: number
// ): Data {
//   return {
//     num,
//     name,
//     oneHPercentage,
//     twentyfourHPercentage,
//     sevenDPercentage,
//     twentyfourHVolume,
//     marketCap,
//     circulatingSupply,
//   };
// }

// const rows = [
//   createData(1, "Cupcake", 305, 3.7, 67, 1, 1, 2, 1),
//   createData(2, "Donut", 452, 25.0, 51, 2, 1, 2, 1),
//   createData(3, "Eclair", 262, 16.0, 24, 3, 1, 2, 1),
//   createData(4, "Frozen yoghurt", 159, 6.0, 24, 4, 1, 2, 1),
//   createData(5, "Gingerbread", 356, 16.0, 49, 5, 1, 2, 1),
//   createData(6, "Honeycomb", 408, 3.2, 87, 5, 1, 2, 1),
//   createData(7, "Ice cream sandwich", 237, 9.0, 37, 5, 1, 2, 1),
//   createData(8, "Jelly Bean", 375, 0.0, 94, 5, 1, 2, 1),
//   createData(9, "KitKat", 518, 26.0, 65, 5, 1, 2, 1),
//   createData(10, "Lollipop", 392, 0.2, 98, 5, 1, 2, 1),
//   createData(11, "Marshmallow", 318, 0, 81, 5, 1, 2, 1),
//   createData(12, "Nougat", 360, 19.0, 9, 5, 1, 2, 1),
//   createData(13, "Oreo", 437, 18.0, 63, 5, 1, 2, 1),
// ];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof CryptoInfo;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "market_cap_rank",
    numeric: true,
    disablePadding: true,
    label: "#",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "price_change_percentage_1h_in_currency",
    numeric: true,
    disablePadding: false,
    label: "1h %",
  },
  {
    id: "price_change_percentage_24h",
    numeric: false,
    disablePadding: false,
    label: "24h %",
  },
  {
    id: "price_change_percentage_7d_in_currency",
    numeric: true,
    disablePadding: false,
    label: "7d %",
  },
  {
    id: "total_volume",
    numeric: false,
    disablePadding: false,
    label: "Volume (24h)",
  },
  {
    id: "market_cap",
    numeric: false,
    disablePadding: false,
    label: "Market Cap",
  },
  {
    id: "circulating_supply",
    numeric: false,
    disablePadding: false,
    label: "Circulating Supply",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof CryptoInfo
  ) => void;
  // onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    // onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof CryptoInfo) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "center" : "right"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}
      {/* {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )} */}
    </Toolbar>
  );
};

interface TableProps {
  data: any;
}

const EnhancedTable: React.FC<TableProps> = ({ data }): JSX.Element => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof CryptoInfo>("market_cap_rank");
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  // const [rows, setRows] = useState<CryptoInfo[]>(data);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof CryptoInfo
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
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    console.log(name);
    console.log(selected);

    setSelected(newSelected);
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

                    const isItemSelected = isSelected(name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, name)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="warning"
                            checked={isItemSelected}
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
    </Container>
  );
};

export default EnhancedTable;
