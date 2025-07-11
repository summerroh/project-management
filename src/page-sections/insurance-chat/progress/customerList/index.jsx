import {
  Box,
  Card,
  Stack,
  styled,
  Table,
  TableContainer,
  useTheme,
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Scrollbar from "components/ScrollBar";
import { H5 } from "components/Typography";
import { useState } from "react";
import TableHeader from "./TableHeader";

import ReversePagination from "components/ReversePagination";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const tableHeading1 = [
  {
    id: "1",
    label: "전체신청",
    alignRight: false,
  },
  {
    id: "2",
    label: "상담전",
    alignRight: false,
  },
  {
    id: "3",
    label: "상담중",
    alignRight: false,
  },
  {
    id: "4",
    label: "상담거절",
    alignRight: false,
  },
  {
    id: "5",
    label: "성공",
    alignRight: false,
  },
  {
    id: "6",
    label: "진행중",
    alignRight: false,
  },
  {
    id: "7",
    label: "실패",
    alignRight: false,
  },
  {
    id: "8",
    label: "대출",
    alignRight: false,
  },
  {
    id: "9",
    label: "연구소",
    alignRight: false,
  },
  {
    id: "10",
    label: "벤처",
    alignRight: false,
  },
  {
    id: "11",
    label: "메인",
    alignRight: false,
  },
  {
    id: "12",
    label: "경정",
    alignRight: false,
  },
  {
    id: "13",
    label: "총 매출(천원)",
    alignRight: false,
  },
];

const tableHeading2 = [
  {
    id: "a",
    label: "IP",
    alignRight: false,
  },
  {
    id: "b",
    label: "상담여부",
    alignRight: false,
  },
  {
    id: "c",
    label: "유입경로",
    alignRight: false,
  },
];

const customerListData1 = [
  {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    g: 0,
    h: 0,
    i: 0,
    j: 0,
    k: 0,
    l: 0,
    m: 0,
  },
];

const customerListData2 = [
  {
    a: "198.235.24.104",
    b: "X",
    c: "직접접속",
  },
  {
    a: "198.235.24.104",
    b: "X",
    c: "직접접속",
  },
  {
    a: "198.235.24.104",
    b: "X",
    c: "직접접속",
  },
  {
    a: "198.235.24.104",
    b: "X",
    c: "직접접속",
  },
  {
    a: "198.235.24.104",
    b: "X",
    c: "직접접속",
  },
  {
    a: "198.235.24.104",
    b: "X",
    c: "직접접속",
  },
];

const StyledTableCell = styled(TableCell)(() => ({
  padding: "0.5rem 0",
  paddingLeft: `1rem !important`,
  paddingRight: `1rem !important`,
  fontWeight: 500,
  fontSize: 14.5,
  color: "#636469",
}));

const CustomerList = () => {
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState("name");
  const [order, setOrder] = useState("asc");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (checked) => {
    if (checked) {
      const newSelecteds = customerListData1.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }

    setSelected([]);
  };

  const filteredUsers1 = stableSort(
    customerListData1,
    getComparator(order, orderBy)
  ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const filteredUsers2 = stableSort(
    customerListData2,
    getComparator(order, orderBy)
  ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <H5 mb={2}>이한솔의 영업 현황</H5>

      <Scrollbar>
        <TableContainer>
          <Table>
            <TableHeader
              order={order}
              orderBy={orderBy}
              heading={tableHeading1}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              rowCount={customerListData1.length}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {filteredUsers1.map((row, index) => {
                const { a, b, c, d, e, f, g, h, i, j, k, l, m } = row;
                // const isItemSelected = selected.indexOf(name) !== -1;
                return (
                  <TableRow
                    key={index}
                    // tabIndex={-1}
                    // role="checkbox"
                  >
                    <StyledTableCell align="left">{a}</StyledTableCell>
                    <StyledTableCell align="left">{b}</StyledTableCell>
                    <StyledTableCell align="left">{c}</StyledTableCell>
                    <StyledTableCell align="left">{d}</StyledTableCell>
                    <StyledTableCell align="left">{e}</StyledTableCell>
                    <StyledTableCell align="left">{f}</StyledTableCell>
                    <StyledTableCell align="left">{g}</StyledTableCell>
                    <StyledTableCell align="left">{h}</StyledTableCell>
                    <StyledTableCell align="left">{i}</StyledTableCell>
                    <StyledTableCell align="left">{j}</StyledTableCell>
                    <StyledTableCell align="left">{k}</StyledTableCell>
                    <StyledTableCell align="left">{l}</StyledTableCell>
                    <StyledTableCell align="left">{m}</StyledTableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Box mt={4}></Box>

      {/* Second Table */}
      <Scrollbar>
        <TableContainer>
          <Table>
            <TableHeader
              order={order}
              orderBy={orderBy}
              heading={tableHeading2}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              rowCount={customerListData2.length}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {filteredUsers2.map((row, index) => {
                const { a, b, c } = row;
                return (
                  <TableRow
                    key={index}
                    // tabIndex={-1}
                    // role="checkbox"
                  >
                    <StyledTableCell align="left">{a}</StyledTableCell>
                    <StyledTableCell align="left">{b}</StyledTableCell>
                    <StyledTableCell align="left">{c}</StyledTableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Stack alignItems="center" marginTop="1rem">
        <ReversePagination totalItems={customerListData1.length} />
      </Stack>
    </>
  );
};

export default CustomerList;
