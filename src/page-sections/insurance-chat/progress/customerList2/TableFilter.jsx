import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  styled,
  useTheme,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useFilters, usePagination, useRowSelect, useTable } from "react-table";
import columnShape from "../columnShape";
import { StyledSearchInput, StyledSearchIcon } from "./styledComponents";
import Scrollbar from "components/ScrollBar";

function SearchFilter({ column }) {
  const { filterValue, setFilter } = column;
  const theme = useTheme();
  return (
    <StyledSearchInput
      value={filterValue || ""}
      onChange={(e) => setFilter(e.target.value)}
      endAdornment={
        <StyledSearchIcon
          sx={{
            color: "#B5B7C0",
          }}
        />
      }
      sx={{
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        border: "1px solid #E1E1E1",
        minWidth: 100,
      }}
    />
  );
}

const HeadTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 500,
  fontSize: 15,
  whiteSpace: "nowrap",
  paddingTop: 12,
  paddingBottom: 12,
  paddingLeft: `1rem !important`,
  paddingRight: `1rem !important`,
  color: "#808187",
  "&:first-of-type": {
    paddingLeft: 24,
  },
  "&:last-of-type": {
    paddingRight: 24,
  },
}));

export default function TableFilter({ data, clearFilter }) {
  const theme = useTheme();
  const tableData = useMemo(() => data, [data]);
  const columns = useMemo(() => columnShape, []);

  const defaultColumn = useMemo(
    () => ({
      Filter: SearchFilter,
    }),
    []
  );
  const { getTableProps, headerGroups, gotoPage, state, setAllFilters } =
    useTable(
      {
        columns,
        defaultColumn,
        data: tableData,
      },
      useFilters,
      usePagination,
      useRowSelect,
      (hooks) => {
        hooks.visibleColumns.push((columns2) => [...columns2]);
      }
    );

  useEffect(() => {
    setAllFilters([]);
  }, [clearFilter, setAllFilters]);

  return (
    <Scrollbar>
      <Box>
        <Table
          {...getTableProps()}
          sx={{ borderCollapse: "separate", borderSpacing: 0 }}
        >
          <TableHead>
            {headerGroups.map((headerGroup, index) => (
              <TableRow {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, columnIndex) => (
                  <HeadTableCell
                    {...column.getHeaderProps()}
                    sx={{
                      fontSize: 15,
                      fontWeight: 500,
                      color: "#808187",
                      borderColor: "secondary.300",
                      "&:first-child": {
                        paddingLeft: "16px",
                      },
                      "&:last-child": {
                        paddingRight: "16px",
                      },
                    }}
                    key={columnIndex}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {column.render("Header")}
                      {column.canFilter ? column.render("Filter") : null}
                    </Box>
                  </HeadTableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
        </Table>
      </Box>
    </Scrollbar>
  );
}
