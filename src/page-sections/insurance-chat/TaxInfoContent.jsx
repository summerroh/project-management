import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import ReversePagination from "components/ReversePagination";
import { H6 } from "components/Typography";

const tableData = [
  {
    항목: "신고금액",
    "2023년": "-",
    "2022년": "-254,860원",
    "2021년": "-",
    "2020년": "0원",
    "2019년": "0원",
  },
  {
    항목: "신고일자",
    "2023년": "-",
    "2022년": "2023-05-17",
    "2021년": "-",
    "2020년": "2021-05-20",
    "2019년": "2020-05-28",
  },
  {
    항목: "신고안내유형",
    "2023년": "-",
    "2022년": "-",
    "2021년": "-",
    "2020년": "-",
    "2019년": "-",
  },
  {
    항목: "기장의무구분",
    "2023년": "간편장부대상자",
    "2022년": "간편장부대상자",
    "2021년": "간편장부대상자",
    "2020년": "간편장부대상자",
    "2019년": "간편장부대상자",
  },
  {
    항목: "추계신고시 적용경비율",
    "2023년": "단순경비율",
    "2022년": "기준경비율",
    "2021년": "기준경비율",
    "2020년": "단순경비율",
    "2019년": "단순경비율",
  },
  {
    항목: "타소득유뮤",
    "2023년": "근로(단일)",
    "2022년": "-",
    "2021년": "-",
    "2020년": "-",
    "2019년": "근로(단일)",
  },
];

const tableData2 = [
  {
    항목: { text: "총수입금액", bold: true },
    "2023년": { text: "35,300,000원" },
    "2022년": { text: "35,300,000원" },
    "2021년": { text: "35,300,000원" },
    "2020년": { text: "0원" },
    "2019년": { text: "35,300,000원" },
  },
  {
    항목: { text: "3.3% 프리랜서" },
    "2023년": { text: "35,300,000원", color: "darkBlue" },
    "2022년": { text: "35,300,000원", color: "darkBlue" },
    "2021년": { text: "35,300,000원", color: "darkBlue" },
    "2020년": { text: "0원", color: "darkBlue" },
    "2019년": { text: "35,300,000원", color: "darkBlue" },
  },
  {
    항목: { text: "근로소득" },
    "2023년": { text: "0원", color: "darkBlue" },
    "2022년": { text: "0원", color: "darkBlue" },
    "2021년": { text: "0원", color: "darkBlue" },
    "2020년": { text: "0원", color: "darkBlue" },
    "2019년": { text: "0원", color: "darkBlue" },
  },
  {
    항목: { text: "기타소득" },
    "2023년": { text: "0원", color: "darkBlue" },
    "2022년": { text: "0원", color: "darkBlue" },
    "2021년": { text: "0원", color: "darkBlue" },
    "2020년": { text: "0원", color: "darkBlue" },
    "2019년": { text: "0원", color: "darkBlue" },
  },
  {
    항목: { text: "개인사업자 소득" },
    "2023년": { text: "0원", color: "darkBlue" },
    "2022년": { text: "0원", color: "darkBlue" },
    "2021년": { text: "0원", color: "darkBlue" },
    "2020년": { text: "0원", color: "darkBlue" },
    "2019년": { text: "0원", color: "darkBlue" },
  },
  {
    항목: { text: "필요경비", bold: true },
    "2023년": { text: "6,000,000원" },
    "2022년": { text: "6,000,000원" },
    "2021년": { text: "6,000,000원" },
    "2020년": { text: "0원" },
    "2019년": { text: "6,000,000원" },
  },
  {
    항목: { text: "3.3% 프리랜서" },
    "2023년": { text: "6,000,000원" },
    "2022년": { text: "6,000,000원" },
    "2021년": { text: "6,000,000원" },
    "2020년": { text: "0원" },
    "2019년": { text: "6,000,000원" },
  },
  {
    항목: { text: "근로소득" },
    "2023년": { text: "0원" },
    "2022년": { text: "0원" },
    "2021년": { text: "0원" },
    "2020년": { text: "0원" },
    "2019년": { text: "0원" },
  },
  {
    항목: { text: "기타소득" },
    "2023년": { text: "0원" },
    "2022년": { text: "0원" },
    "2021년": { text: "0원" },
    "2020년": { text: "0원" },
    "2019년": { text: "0원" },
  },
  {
    항목: { text: "개인사업자" },
    "2023년": { text: "0원" },
    "2022년": { text: "0원" },
    "2021년": { text: "0원" },
    "2020년": { text: "0원" },
    "2019년": { text: "0원" },
  },
  {
    항목: { text: "추가 필요경비", bold: true, color: "darkBlue" },
    "2023년": { text: "0원", isInput: true },
    "2022년": { text: "0원", isInput: true },
    "2021년": { text: "0원", isInput: true },
    "2020년": { text: "0원", isInput: true },
    "2019년": { text: "0원", isInput: true },
  },
  {
    항목: { text: "(참고: 연말정산 카드총액)" },
    "2023년": { text: "6,000,000원" },
    "2022년": { text: "6,000,000원" },
    "2021년": { text: "6,000,000원" },
    "2020년": { text: "0원" },
    "2019년": { text: "6,000,000원" },
  },
  {
    항목: { text: "소득공제", bold: true },
    "2023년": { text: "35,300,000원", color: "darkBlue" },
    "2022년": { text: "35,300,000원", color: "darkBlue" },
    "2021년": { text: "35,300,000원", color: "darkBlue" },
    "2020년": { text: "0원", color: "darkBlue" },
    "2019년": { text: "35,300,000원", color: "darkBlue" },
  },
  {
    항목: { text: "추가 소득공제", bold: true, color: "darkBlue" },
    "2023년": { text: "0원", isInput: true },
    "2022년": { text: "0원", isInput: true },
    "2021년": { text: "0원", isInput: true },
    "2020년": { text: "0원", isInput: true },
    "2019년": { text: "0원", isInput: true },
  },
  {
    항목: { text: "과세표준", bold: true },
    "2023년": { text: "6,000,000원" },
    "2022년": { text: "6,000,000원" },
    "2021년": { text: "6,000,000원" },
    "2020년": { text: "0원" },
    "2019년": { text: "6,000,000원" },
  },
];

export default function TaxInfoContent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid container>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          width: "100%",
          padding: isMobile ? "0 0 8px 0" : "0 32px",
        }}
      >
        <Grid item container spacing={4} pt={2} pb={4}>
          <Section1 theme={theme} />
          <Section2 theme={theme} />
        </Grid>
      </Grid>
    </Grid>
  );
}

const Section1 = ({ theme }) => {
  return (
    <>
      <Grid item container xs={12} height="100%">
        <Box sx={{ width: "100%", height: "100%", p: 2 }}>
          <FlexRowAlign
            mb={2}
            sx={{
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <H6>연도별 신고정보</H6>
          </FlexRowAlign>

          <Grid container sx={{ height: "100%" }}>
            <Grid item xs={12} display={"flex"} flexDirection={"column"}>
              {/* Table */}
              <Box sx={{ textAlign: "left", mb: 2, overflow: "auto" }}>
                <Table
                  sx={{
                    "& .MuiTableCell-root": {
                      borderBottom: `1px solid ${theme.palette.primary.borderColor}`,
                      whiteSpace: "nowrap",
                    },
                  }}
                >
                  <TableHead>
                    <TableRow
                      sx={{ backgroundColor: theme.palette.primary.grey800 }}
                    >
                      <TableCell
                        sx={{
                          paddingLeft: "24px !important",
                          fontWeight: 600,
                        }}
                      >
                        항목
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>2023년</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>2022년</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>2021년</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>2020년</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>2019년</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableData.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          paddingLeft: "10px",
                          "&:hover": {
                            backgroundColor: theme.palette.primary.grey800,
                            cursor: "pointer",
                          },
                        }}
                      >
                        <TableCell
                          sx={{
                            paddingLeft: "24px !important",
                            fontWeight: 400,
                          }}
                        >
                          {row.항목}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 400 }}>
                          {row["2023년"]}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 400 }}>
                          {row["2022년"]}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 400 }}>
                          {row["2021년"]}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 400 }}>
                          {row["2020년"]}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 400 }}>
                          {row["2019년"]}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <ReversePagination totalItems={3} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </>
  );
};

const Section2 = ({ theme }) => {
  return (
    <>
      <Grid item container xs={12} height="100%">
        <Box sx={{ width: "100%", height: "100%", p: 2 }}>
          <FlexRowAlign
            mb={2}
            sx={{
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <H6>예상세금 자동계산기</H6>
          </FlexRowAlign>

          <Grid container sx={{ height: "100%" }}>
            <Grid item xs={12} display={"flex"} flexDirection={"column"}>
              {/* Table */}
              <Box sx={{ textAlign: "left", mb: 2, overflow: "auto" }}>
                <Table
                  sx={{
                    "& .MuiTableCell-root": {
                      borderBottom: `1px solid ${theme.palette.primary.borderColor}`,
                      whiteSpace: "nowrap",
                    },
                  }}
                >
                  <TableHead>
                    <TableRow
                      sx={{ backgroundColor: theme.palette.primary.grey800 }}
                    >
                      <TableCell
                        sx={{
                          paddingLeft: "24px !important",
                          fontWeight: 600,
                        }}
                      >
                        항목
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>2023년</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>2022년</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>2021년</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>2020년</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>2019년</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableData2.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          paddingLeft: "10px",
                          "&:hover": {
                            backgroundColor: theme.palette.primary.grey800,
                            cursor: "pointer",
                          },
                        }}
                      >
                        <TableCell
                          sx={{
                            paddingLeft: "24px !important",
                            fontWeight: row.항목.bold ? 600 : 400,
                            color: row.항목.color
                              ? theme.palette.primary[row.항목.color]
                              : "inherit",
                          }}
                        >
                          {row.항목.text}
                        </TableCell>
                        {["2023년", "2022년", "2021년", "2020년", "2019년"].map(
                          (year) => (
                            <TableCell
                              key={year}
                              sx={{
                                fontWeight: row[year].bold ? 600 : 400,
                                color: row[year].color
                                  ? theme.palette.primary[row[year].color]
                                  : "inherit",
                              }}
                            >
                              {row[year].isInput ? (
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                  }}
                                >
                                  <input
                                    type="number"
                                    defaultValue={0}
                                    style={{
                                      width: "100px",
                                      padding: "4px 8px",
                                      border: `1px solid ${theme.palette.primary.borderColor}`,
                                      borderRadius: "4px",
                                    }}
                                    onChange={(e) => {}}
                                  />
                                  <span>원</span>
                                </Box>
                              ) : (
                                row[year].text
                              )}
                            </TableCell>
                          )
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <ReversePagination totalItems={3} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </>
  );
};
