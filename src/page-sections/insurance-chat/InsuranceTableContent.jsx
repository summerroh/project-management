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

export default function InsuranceTableContent() {
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
              <Divider sx={{ width: "100%", mt: 2 }} />
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
  const [selectedUnit, setSelectedUnit] = useState("Month");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedEvidence, setSelectedEvidence] = useState("All");
  const [selectedTaxType, setSelectedTaxType] = useState("All");

  const getButtonStyle = (index, arrayLength, item, selectedValue) => ({
    height: "40px",
    paddingX: "10px",
    fontWeight: 400,
    fontSize: 13.5,
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
            p: isTablet ? 1 : 2,
            flexWrap: "wrap",
          }}
        >
          <FlexBox sx={{ flexDirection: "column", minWidth: "200px" }}>
            <H6 mb={1}>Reference Date</H6>
            <MySelect
              items={["Last Week", "This Week", "Today"]}
              width={"200px"}
              placeholder={"Reference Date"}
            />
          </FlexBox>

          <FlexBox sx={{ flexDirection: "column", minWidth: "300px" }}>
            <H6 mb={1}>Time Unit</H6>
            <FlexBox>
              {["Month", "Quarter", "Half Year", "Year", "Other"].map(
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
            <H6 mb={1}>Detailed Period</H6>
            <MySelect
              items={["2024", "2023", "2022"]}
              width={"200px"}
              defaultValue={"2024"}
            />
          </FlexBox>

          <FlexBox sx={{ flexDirection: "column", minWidth: "300px" }}>
            <H6 mb={1}>Type</H6>
            <FlexBox>
              {["All", "Income", "Expense"].map((item, index, array) => (
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
            <H6 mb={1}>Document Type</H6>
            <FlexBox
              sx={{
                flexWrap: isTablet ? "wrap" : "nowrap",
                gap: isTablet ? 0 : 0,
              }}
            >
              {["All", "Invoice", "Receipt", "Card", "Cash", "Other"].map(
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
            <H6 mb={1}>Tax Type</H6>
            <FlexBox>
              {["All", "Taxable", "Tax Exempt"].map((item, index, array) => (
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
      date: "2024-01-04",
      type: "Income",
      evidence: "Invoice",
      taxType: "Taxable",
      company: "TechCorp Solutions",
      businessNumber: "123-45-67890",
      itemName: "Software Development",
      totalAmount: "$5,500.00",
      supplyAmount: "$5,000.00",
      vatAmount: "$500.00",
      inputDate: "2024-01-04 12:45",
    },
    {
      date: "2024-01-05",
      type: "Expense",
      evidence: "Invoice",
      taxType: "Taxable",
      company: "Office Supplies Co",
      businessNumber: "234-56-78901",
      itemName: "Office Equipment",
      totalAmount: "$3,300.00",
      supplyAmount: "$3,000.00",
      vatAmount: "$300.00",
      inputDate: "2024-01-05 09:30",
    },
    {
      date: "2024-01-06",
      type: "Income",
      evidence: "Receipt",
      taxType: "Tax Exempt",
      company: "Consulting Partners",
      businessNumber: "345-67-89012",
      itemName: "Consulting Services",
      totalAmount: "$2,200.00",
      supplyAmount: "$2,200.00",
      vatAmount: "$0.00",
      inputDate: "2024-01-06 14:20",
    },
    {
      date: "2024-01-07",
      type: "Expense",
      evidence: "Invoice",
      taxType: "Taxable",
      company: "Digital Marketing Inc",
      businessNumber: "456-78-90123",
      itemName: "Marketing Services",
      totalAmount: "$1,100.00",
      supplyAmount: "$1,000.00",
      vatAmount: "$100.00",
      inputDate: "2024-01-07 16:15",
    },
    {
      date: "2024-01-08",
      type: "Income",
      evidence: "Invoice",
      taxType: "Taxable",
      company: "Global Solutions Ltd",
      businessNumber: "567-89-01234",
      itemName: "Project Management",
      totalAmount: "$8,800.00",
      supplyAmount: "$8,000.00",
      vatAmount: "$800.00",
      inputDate: "2024-01-08 11:25",
    },
    {
      date: "2024-01-09",
      type: "Expense",
      evidence: "Receipt",
      taxType: "Tax Exempt",
      company: "Training Institute",
      businessNumber: "678-90-12345",
      itemName: "Employee Training",
      totalAmount: "$1,500.00",
      supplyAmount: "$1,500.00",
      vatAmount: "$0.00",
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
            <H6>Search Results</H6>
            <Tiny>Search Period: 2024.01.01 ~ 2024.12.31</Tiny>
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
              startIcon={<img src={"/static/logos/excel.png"} width={28} />}
              sx={{
                color: "#169154",
                border: `1px solid ${theme.palette.primary.borderColor}`,
                backgroundColor: theme.palette.primary.lightGreen,
                "&:hover": {
                  backgroundColor: theme.palette.primary.lightGreen,
                },
              }}
            >
              Export to Excel
            </Button>
          </FlexRowAlign>

          <Box mb={2}>
            <Tiny>Total 110 items</Tiny>
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
                        Transaction Date
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Document</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Tax Type</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Company</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>
                        Business Number
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Item</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Total Amount</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Net Amount</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Tax Amount</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Entry Date</TableCell>
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
