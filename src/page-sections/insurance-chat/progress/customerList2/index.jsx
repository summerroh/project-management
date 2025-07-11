import {
  Box,
  Card,
  Divider,
  Grid,
  styled,
  Table,
  TableContainer,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import AppCheckBox from "components/AppCheckBox";
import { H5, H6, H7, Small, TableContent } from "components/Typography";
import { useState } from "react";
import TableHeader from "./TableHeader";

import FlexBox from "components/flexbox/FlexBox";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import AppTextField from "components/input-fields/AppTextField";
import TableFilter from "./TableFilter";

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

const tableHeading = [
  {
    id: "a",
    label: "상담 목적",
    alignRight: false,
  },
  {
    id: "b",
    label: "이름",
    alignRight: false,
  },
  {
    id: "c",
    label: "핸드폰 번호",
    alignRight: false,
  },
  {
    id: "d",
    label: "문의 경로",
    alignRight: false,
  },
  {
    id: "e",
    label: "알게된 시간",
    alignRight: false,
  },
  {
    id: "f",
    label: "보험 이해도",
    alignRight: false,
  },
  {
    id: "g",
    label: "월보험료",
    alignRight: false,
  },
  {
    id: "h",
    label: "현재건상태",
    alignRight: false,
  },
  {
    id: "i",
    label: "고객 메모",
    alignRight: false,
  },
]; // list data
const tableHeading2 = [
  {
    id: "a",
    label: "상담전",
    alignRight: false,
  },
  {
    id: "b",
    label: "1차연락",
    alignRight: false,
  },
  {
    id: "c",
    label: "2차연락",
    alignRight: false,
  },
  {
    id: "d",
    label: "상담거절",
    alignRight: false,
  },
  {
    id: "e",
    label: "성공",
    alignRight: false,
  },
  {
    id: "f",
    label: "실패",
    alignRight: false,
  },
  {
    id: "g",
    label: "진행여부",
    alignRight: false,
  },
  {
    id: "h",
    label: "대출",
    alignRight: false,
  },
  {
    id: "i",
    label: "연구소",
    alignRight: false,
  },
  {
    id: "j",
    label: "벤처",
    alignRight: false,
  },
  {
    id: "k",
    label: "메인",
    alignRight: false,
  },
  {
    id: "l",
    label: "경정",
    alignRight: false,
  },
  {
    id: "m",
    label: "총 매출 (천원)",
    alignRight: false,
  },
]; // list data

const StyledTableCell = styled(TableCell)(() => ({
  padding: "0.5rem 0",
  paddingLeft: `1rem !important`,
  paddingRight: `1rem !important`,
  fontWeight: 300,
  whiteSpace: "nowrap",
}));

const CustomerList = ({ customerListData }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [filteredItem, setFilteredItem] = useState(tableHeading);
  const [clearFilter, setClearFilter] = useState("");
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState("name");
  const [order, setOrder] = useState("asc");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);

  const [memo, setMemo] = useState("");
  const [adminMemo, setAdminMemo] = useState("");
  const [administrator, setAdministrator] = useState("");

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const filteredUsers = stableSort(
    customerListData,
    getComparator(order, orderBy)
  ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box>
      <Divider sx={{ marginY: 8 }} />

      <TableContainer
        sx={{
          marginTop: 2,
          // minWidth: 800,
        }}
      >
        <Table>
          <TableHeader
            order={order}
            orderBy={orderBy}
            heading={tableHeading}
            numSelected={selected.length}
            onRequestSort={handleRequestSort}
            rowCount={customerListData.length}
          />
          <TableBody>
            {customerListData.map((customer, index) => (
              <TableRow
                key={index}
                tabIndex={-1}
                role="checkbox"
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                {Object.entries(customer).map(([key, value], i) => (
                  <StyledTableCell key={i}>
                    {key === "memo" && value === true ? (
                      <AppTextField
                        fullWidth
                        name="memo"
                        placeholder=""
                        value={memo}
                        onChange={(e) => setMemo(e.target.value)}
                        sx={{
                          backgroundColor:
                            theme.palette.primary.lightBlueBackground,
                          "& .MuiOutlinedInput-input::placeholder": {
                            fontWeight: 300,
                            fontSize: 15.5,
                            color: "#B5B7C0",
                          },
                        }}
                        inputProps={{ style: { height: 0, width: 100 } }}
                      />
                    ) : key === "purpose" ? (
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                          sx={{
                            width: 16,
                            height: 16,
                            backgroundColor:
                              value === "개인 보험 설계"
                                ? "orange"
                                : value === "설계사 입사"
                                ? theme.palette.primary.main
                                : value === "보장분석"
                                ? theme.palette.primary.purple
                                : theme.palette.primary.grey,
                            marginRight: 1,
                            borderRadius: 2,
                          }}
                        />
                        <H7>{value}</H7>
                      </Box>
                    ) : (
                      <H7>{value}</H7>
                    )}
                  </StyledTableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Table>
          <TableHeader
            order={order}
            orderBy={orderBy}
            heading={tableHeading2}
            numSelected={selected.length}
            onRequestSort={handleRequestSort}
            rowCount={customerListData.length}
          />
          <TableBody>
            {filteredUsers.map((row, index) => {
              const { name } = row;
              const isItemSelected = selected.indexOf(name) !== -1;
              return (
                <TableRow
                  key={index}
                  tabIndex={-1}
                  role="checkbox"
                  selected={isItemSelected}
                  aria-checked={isItemSelected}
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  {Array.from({ length: 6 }, (_, i) => (
                    <StyledTableCell padding="checkbox" key={i}>
                      <AppCheckBox />
                    </StyledTableCell>
                  ))}

                  {Array.from({ length: 7 }, (_, i) => (
                    <StyledTableCell key={i}>
                      <FlexBox gap={1} sx={{ flexDirection: "column" }}>
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                          <AppCheckBox />
                          <TableContent
                            color="text.primary"
                            sx={{ marginLeft: 1 }}
                          >
                            진행중
                          </TableContent>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                          <AppCheckBox />
                          <TableContent
                            color="text.primary"
                            sx={{ marginLeft: 1 }}
                          >
                            완료
                          </TableContent>
                        </Box>
                      </FlexBox>
                    </StyledTableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* </Scrollbar> */}

      <Divider sx={{ marginY: 4 }} />

      <Grid container spacing={2}>
        <Grid item sm={3} xs={12}>
          <TableContent mb={1}>담당자</TableContent>
          <AppTextField
            fullWidth
            name="administrator"
            placeholder=""
            value={administrator}
            onChange={(e) => setAdministrator(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-input::placeholder": {
                fontWeight: 300,
                fontSize: 15.5,
                color: "#B5B7C0",
              },
            }}
            inputProps={{ style: { height: 18 } }}
          />
        </Grid>

        <Grid item sm={6} xs={12}>
          <TableContent mb={1}>메모</TableContent>
          <AppTextField
            fullWidth
            name="adminMemo"
            placeholder=""
            value={adminMemo}
            onChange={(e) => setAdminMemo(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-input::placeholder": {
                fontWeight: 300,
                fontSize: 15.5,
                color: "#B5B7C0",
              },
            }}
            inputProps={{ style: { height: 18 } }}
          />
        </Grid>

        <Grid item sm={3} xs={12}>
          <TableContent mb={1}>날짜</TableContent>
          <AppTextField
            fullWidth
            name="adminMemo"
            placeholder=""
            value={adminMemo}
            onChange={(e) => setAdminMemo(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-input::placeholder": {
                fontWeight: 300,
                fontSize: 15.5,
                color: "#B5B7C0",
              },
            }}
            inputProps={{ style: { height: 18 } }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerList;
