import {
  Box,
  Button,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FlexBox from "components/flexbox/FlexBox";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import MySelect from "components/MySelect";
import ReversePagination from "components/ReversePagination";
import { H2, H6, Tiny } from "components/Typography";
import GreySearchBar from "layouts/layout-parts/GreySearchBar";
import { useState } from "react";

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

export default function ExcelModalContent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid container>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          width: "100%",
          padding: isMobile ? "0px" : "0 32px",
        }}
      >
        <Grid item container spacing={4} pt={2} pb={4}>
          <Section1 theme={theme} />
          <Section3 theme={theme} />
          <Section4 theme={theme} />
          <Section5 theme={theme} />
        </Grid>
      </Grid>
    </Grid>
  );
}

const Section1 = ({ theme }) => {
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedUnit, setSelectedUnit] = useState("월");
  const [selectedType, setSelectedType] = useState("전체");
  const [selectedEvidence, setSelectedEvidence] = useState("전체");
  const [selectedTaxType, setSelectedTaxType] = useState("전체");

  const getButtonStyle = (index, arrayLength, item, selectedValue) => ({
    height: "40px",
    borderRadius: 0,
    borderColor: theme.palette.primary.borderColor,
    ...(index === 0 && {
      borderTopLeftRadius: "10px",
      borderBottomLeftRadius: "10px",
    }),
    ...(index === arrayLength - 1 && {
      borderTopRightRadius: "10px",
      borderBottomRightRadius: "10px",
    }),
    "&:hover": {
      backgroundColor: theme.palette.primary.lightBlue3,
    },
    ...(selectedValue === item && {
      backgroundColor: theme.palette.primary.darkBlue,
      color: "white",
      "&:hover": {
        backgroundColor: theme.palette.primary.darkBlue,
      },
    }),
  });

  return (
    <>
      <Grid item container xs={12} height="100%" flexDirection={"row"}>
        <FlexBox
          gap={2}
          sx={{
            width: "100%",
            height: "100%",
            p: 2,
            flexWrap: "wrap",
          }}
        >
          <FlexBox mb={2} sx={{ flexDirection: "column", minWidth: "100%" }}>
            <H2>한솔농산 경정청구 검토 결과</H2>
          </FlexBox>

          <FlexBox sx={{ flexDirection: "column", minWidth: "200px" }}>
            <H6 mb={1}>기준일</H6>
            <MySelect
              items={["저번 주", "이번 주", "오늘"]}
              width={"200px"}
              placeholder={"기준일"}
            />
          </FlexBox>

          <FlexBox sx={{ flexDirection: "column", minWidth: "300px" }}>
            <H6 mb={1}>기준 단위</H6>
            <FlexBox>
              {["월", "분기", "반기", "연", "기타"].map(
                (item, index, array) => (
                  <Button
                    key={index}
                    variant="outlined"
                    onClick={() => setSelectedUnit(item)}
                    sx={getButtonStyle(index, array.length, item, selectedUnit)}
                  >
                    {item}
                  </Button>
                )
              )}
            </FlexBox>
          </FlexBox>

          <FlexBox sx={{ flexDirection: "column", minWidth: "200px" }}>
            <H6 mb={1}>상세 기간</H6>
            <MySelect
              items={["2024년", "2023년", "2022년"]}
              width={"200px"}
              defaultValue={"2024년"}
            />
          </FlexBox>

          <FlexBox sx={{ flexDirection: "column", minWidth: "300px" }}>
            <H6 mb={1}>종류</H6>
            <FlexBox>
              {["전체", "매출", "매입"].map((item, index, array) => (
                <Button
                  key={index}
                  variant="outlined"
                  onClick={() => setSelectedType(item)}
                  sx={getButtonStyle(index, array.length, item, selectedType)}
                >
                  {item}
                </Button>
              ))}
            </FlexBox>
          </FlexBox>

          <FlexBox
            sx={{
              flexDirection: "column",
              minWidth: isTablet ? "100%" : "300px",
            }}
          >
            <H6 mb={1}>증명</H6>
            <FlexBox
              sx={{
                flexWrap: isTablet ? "wrap" : "nowrap",
                gap: isTablet ? 0 : 0,
              }}
            >
              {["전체", "세금계산서", "계산서", "카드", "현금", "기타"].map(
                (item, index, array) => (
                  <Button
                    key={index}
                    variant="outlined"
                    onClick={() => setSelectedEvidence(item)}
                    sx={{
                      ...getButtonStyle(
                        index,
                        array.length,
                        item,
                        selectedEvidence
                      ),
                      ...(isTablet && {
                        flex: "1 1 calc(33.33% - 8px)",
                        minWidth: "auto",
                        marginBottom: "8px",
                      }),
                    }}
                  >
                    {item}
                  </Button>
                )
              )}
            </FlexBox>
          </FlexBox>

          <FlexBox sx={{ flexDirection: "column", minWidth: "300px" }}>
            <H6 mb={1}>과세 유형</H6>
            <FlexBox>
              {["전체", "과세", "면세"].map((item, index, array) => (
                <Button
                  key={index}
                  variant="outlined"
                  onClick={() => setSelectedTaxType(item)}
                  sx={getButtonStyle(
                    index,
                    array.length,
                    item,
                    selectedTaxType
                  )}
                >
                  {item}
                </Button>
              ))}
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </Grid>
    </>
  );
};

const Section3 = ({ theme }) => {
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const tableData = [
    {
      date: "2021-01-04",
      company: "현대빌딩",
      type: "개인",
      taxType: "과세",
      businessNumber: "000-00-00000",
      business: "사무실 임대",
      sales: "5,500,000원",
      purchase: "5,500,000원",
      vatAmount: "5,500,000원",
      refund: "500,000원",
    },
    {
      date: "2021-01-04",
      company: "삼성전자",
      type: "법인",
      taxType: "과세",
      businessNumber: "000-00-00000",
      business: "사무실 임대",
      sales: "5,500,000원",
      purchase: "5,500,000원",
      vatAmount: "5,500,000원",
      refund: "500,000원",
    },
    {
      date: "2021-01-04",
      company: "대한물산",
      type: "개인",
      taxType: "과세",
      businessNumber: "000-00-00000",
      business: "사무실 임대",
      sales: "5,500,000원",
      purchase: "5,500,000원",
      vatAmount: "5,500,000원",
      refund: "500,000원",
    },
    {
      date: "2021-01-04",
      company: "LG전자",
      type: "법인",
      taxType: "과세",
      businessNumber: "000-00-00000",
      business: "사무실 임대",
      sales: "5,500,000원",
      purchase: "5,500,000원",
      vatAmount: "5,500,000원",
      refund: "500,000원",
    },
    {
      date: "2021-01-04",
      company: "롯데마트",
      type: "개인",
      taxType: "과세",
      businessNumber: "000-00-00000",
      business: "사무실 임대",
      sales: "5,500,000원",
      purchase: "5,500,000원",
      vatAmount: "5,500,000원",
      refund: "500,000원",
    },
    {
      date: "2021-01-04",
      company: "한국기업",
      type: "법인",
      taxType: "과세",
      businessNumber: "000-00-00000",
      business: "사무실 임대",
      sales: "5,500,000원",
      purchase: "5,500,000원",
      vatAmount: "5,500,000원",
      refund: "500,000원",
    },
  ];

  return (
    <>
      <Grid item container xs={12} height="100%">
        <Box sx={{ width: "100%", height: "100%", p: 2 }}>
          <FlexBox
            mb={2}
            sx={{
              gap: isTablet ? 2 : 0,
              justifyContent: isTablet ? "flex-start" : "space-between",
              width: "100%",
              alignItems: isTablet ? "flex-start" : "center",
              flexDirection: isTablet ? "column" : "row",
            }}
          >
            <H6>조회 결과</H6>
            <Tiny>조회기준일자: 2024.01.01 ~ 2024.12.31</Tiny>
          </FlexBox>

          <FlexRowAlign
            mb={2}
            sx={{
              gap: isTablet ? 2 : 0,
              justifyContent: isTablet ? "flex-start" : "space-between",
              width: "100%",
              alignItems: isTablet ? "flex-start" : "center",
              flexDirection: isTablet ? "column" : "row",
            }}
          >
            <Box sx={{ width: isTablet ? "100%" : "350px" }}>
              <GreySearchBar />
            </Box>
            <Button
              variant="contained"
              size="small"
              startIcon={<img src={"/static/logo/excel.png"} width={28} />}
              sx={{
                color: "#169154",
                border: `1px solid ${theme.palette.primary.borderColor}`,
                backgroundColor: theme.palette.primary.lightGreen,
                "&:hover": {
                  backgroundColor: theme.palette.primary.lightGreen,
                },
              }}
            >
              엑셀 다운로드
            </Button>
          </FlexRowAlign>

          <FlexBox
            mb={2}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Tiny>전체 110건</Tiny>

            <FlexRowAlign gap={2}>
              <MySelect
                items={["5개씩 보기", "10개씩 보기"]}
                width={"100px"}
                defaultValue={"5개씩 보기"}
              />
              <MySelect
                items={["최신순", "오래된순", "금액순"]}
                width={"100px"}
                defaultValue={"최신순"}
              />
            </FlexRowAlign>
          </FlexBox>

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
                    minWidth: "1200px",
                  }}
                >
                  <TableHead>
                    <TableRow
                      sx={{ backgroundColor: theme.palette.primary.grey800 }}
                    >
                      <TableCell
                        sx={{ paddingLeft: "24px !important", fontWeight: 600 }}
                      >
                        거래일자
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>거래처명</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>종류</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>과세유형</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>
                        사업자/주민번호
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>종목/업태</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>매출</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>매입</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>부가세액</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>예상환급</TableCell>
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
                          {row.date}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 400 }}>
                          {row.company}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 400 }}>
                          {row.type}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 400 }}>
                          {row.taxType}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 400 }}>
                          {row.businessNumber}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 400 }}>
                          {row.business}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 400 }}>
                          {row.sales}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 400 }}>
                          {row.purchase}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 400 }}>
                          {row.vatAmount}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 400 }}>
                          {row.refund}
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

const Section4 = ({ theme }) => {
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
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </>
  );
};

const Section5 = ({ theme }) => {
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
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </>
  );
};
