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
import { H6, Tiny } from "components/Typography";
import GreySearchBar from "layouts/layout-parts/GreySearchBar";
import { useState } from "react";

export default function QuotationContent() {
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
          padding: isMobile ? "0px" : "0 32px",
        }}
      >
        <Grid item container spacing={4} pt={2} pb={4}>
          <Section1 theme={theme} />

          <Grid item xs={12}>
            <Box sx={{ width: "100%", px: 2 }}>
              <Divider sx={{ width: "100%" }} />
            </Box>
          </Grid>

          <Section3 theme={theme} />
        </Grid>
      </Grid>
    </Grid>
  );
}

const Section1 = ({ theme }) => {
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Grid item container xs={12} height="100%" flexDirection={"row"}>
        <FlexBox
          sx={{
            width: "100%",
            height: "100%",
            p: 2,
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <FlexBox
            sx={{ flexDirection: isTablet ? "column" : "row", gap: 1.5 }}
          >
            <FlexBox sx={{ flexDirection: "column", minWidth: "200px" }}>
              <H6 mb={1}>서비스 구분</H6>
              <MySelect
                items={["전체", "영업", "회계"]}
                width={"200px"}
                placeholder={"서비스 구분"}
              />
            </FlexBox>

            <FlexBox sx={{ flexDirection: "column", minWidth: "200px" }}>
              <H6 mb={1}>지역</H6>
              <MySelect
                items={["서울", "경기", "인천"]}
                width={"200px"}
                placeholder={"지역"}
              />
            </FlexBox>

            <FlexBox sx={{ flexDirection: "column", minWidth: "200px" }}>
              <H6 mb={1}>요청 상태</H6>
              <MySelect
                items={["전체", "완료", "미완료"]}
                width={"200px"}
                placeholder={"요청 상태"}
              />
            </FlexBox>
          </FlexBox>

          <FlexBox mt={isTablet ? 2 : 0}>
            <Button variant="outlined" sx={{ mr: 1.5, height: "40px" }}>
              초기화
            </Button>
            <Button
              variant="contained"
              sx={{
                height: "40px",
                backgroundColor: theme.palette.primary.darkBlue,
                "&:hover": {
                  backgroundColor: theme.palette.primary.darkBlueHover,
                },
              }}
            >
              검색
            </Button>
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
      type: "매출",
      evidence: "세금계산서",
      taxType: "과세",
      company: "현대빌딩",
      businessNumber: "000-00-00000",
      itemName: "사무실 임대",
      totalAmount: "5,500,000원",
      supplyAmount: "5,500,000원",
      vatAmount: "500,000원",
      inputDate: "2024-01-04 12:45",
    },
    {
      date: "2021-01-05",
      type: "매입",
      evidence: "세금계산서",
      taxType: "과세",
      company: "삼성전자",
      businessNumber: "111-11-11111",
      itemName: "전자제품",
      totalAmount: "3,300,000원",
      supplyAmount: "3,000,000원",
      vatAmount: "300,000원",
      inputDate: "2024-01-05 09:30",
    },
    {
      date: "2021-01-06",
      type: "매출",
      evidence: "현금영수증",
      taxType: "면세",
      company: "대한물산",
      businessNumber: "222-22-22222",
      itemName: "컨설팅 서비스",
      totalAmount: "2,200,000원",
      supplyAmount: "2,200,000원",
      vatAmount: "0원",
      inputDate: "2024-01-06 14:20",
    },
    {
      date: "2021-01-07",
      type: "매입",
      evidence: "세금계산서",
      taxType: "과세",
      company: "LG전자",
      businessNumber: "333-33-33333",
      itemName: "사무용품",
      totalAmount: "1,100,000원",
      supplyAmount: "1,000,000원",
      vatAmount: "100,000원",
      inputDate: "2024-01-07 16:15",
    },
    {
      date: "2021-01-08",
      type: "매출",
      evidence: "세금계산서",
      taxType: "과세",
      company: "롯데마트",
      businessNumber: "444-44-44444",
      itemName: "물품 납품",
      totalAmount: "8,800,000원",
      supplyAmount: "8,000,000원",
      vatAmount: "800,000원",
      inputDate: "2024-01-08 11:25",
    },
    {
      date: "2021-01-09",
      type: "매입",
      evidence: "현금영수증",
      taxType: "면세",
      company: "한국기업",
      businessNumber: "555-55-55555",
      itemName: "교육 서비스",
      totalAmount: "1,500,000원",
      supplyAmount: "1,500,000원",
      vatAmount: "0원",
      inputDate: "2024-01-09 13:40",
    },
  ];

  return (
    <>
      <Grid item container xs={12} height="100%">
        <Box sx={{ width: "100%", height: "100%", p: 2 }}>
          <FlexRowAlign
            mb={2}
            sx={{
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <H6>조회 결과</H6>
            <Tiny>조회기준일자: 2024.01.01 ~ 2024.12.31</Tiny>
          </FlexRowAlign>

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

          <Box mb={2}>
            <Tiny>전체 110건</Tiny>
          </Box>

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
                        sx={{
                          paddingLeft: "24px !important",
                          fontWeight: 600,
                        }}
                      >
                        거래일자
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>종류</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>증빙</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>과세유형</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>거래처명</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>
                        사업자/주민번호
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>품명</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>합계금액</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>공급가액</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>부가세액</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>입력일시</TableCell>
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
                          {row.type}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 400 }}>
                          {row.evidence}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 400 }}>
                          {row.taxType}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 400 }}>
                          {row.company}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 400 }}>
                          {row.businessNumber}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 400 }}>
                          {row.itemName}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 400 }}>
                          {row.totalAmount}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 400 }}>
                          {row.supplyAmount}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 400 }}>
                          {row.vatAmount}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 400 }}>
                          {row.inputDate}
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
