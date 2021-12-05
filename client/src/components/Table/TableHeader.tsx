import React from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import { visuallyHidden } from "@mui/utils";

import { PricesData } from "../../state/actions";
import { Order } from "./interfaces";

export interface HeadCell {
  disablePadding: boolean;
  id: keyof PricesData;
  label: string;
  numeric: boolean;
}

export const headCells: readonly HeadCell[] = [
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
    numeric: false,
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
    numeric: false,
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
  {
    id: "sparklineSevenDays",
    numeric: false,
    disablePadding: false,
    label: "Line Chart",
  },
];

export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof PricesData
  ) => void;
  // onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead({
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
}: /* onSelectAllClick*/ EnhancedTableProps) {
  const createSortHandler =
    (property: keyof PricesData) => (event: React.MouseEvent<unknown>) => {
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

export default EnhancedTableHead;
