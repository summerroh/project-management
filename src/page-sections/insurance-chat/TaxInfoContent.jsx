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
    항목: "Report Amount",
    "2023년": "-",
    "2022년": "-$254,860",
    "2021년": "-",
    "2020년": "$0",
    "2019년": "$0",
  },
  {
    항목: "Report Date",
    "2023년": "-",
    "2022년": "2023-05-17",
    "2021년": "-",
    "2020년": "2021-05-20",
    "2019년": "2020-05-28",
  },
  {
    항목: "Report Type",
    "2023년": "-",
    "2022년": "-",
    "2021년": "-",
    "2020년": "-",
    "2019년": "-",
  },
  {
    항목: "Record Type",
    "2023년": "Simplified Records",
    "2022년": "Simplified Records",
    "2021년": "Simplified Records",
    "2020년": "Simplified Records",
    "2019년": "Simplified Records",
  },
  {
    항목: "Expense Ratio",
    "2023년": "Simple Expense Ratio",
    "2022년": "Standard Expense Ratio",
    "2021년": "Standard Expense Ratio",
    "2020년": "Simple Expense Ratio",
    "2019년": "Simple Expense Ratio",
  },
  {
    항목: "Other Income",
    "2023년": "Employment (Single)",
    "2022년": "-",
    "2021년": "-",
    "2020년": "-",
    "2019년": "Employment (Single)",
  },
];

const tableData2 = [
  {
    항목: { text: "Total Revenue", bold: true },
    "2023년": { text: "$35,300,000" },
    "2022년": { text: "$35,300,000" },
    "2021년": { text: "$35,300,000" },
    "2020년": { text: "$0" },
    "2019년": { text: "$35,300,000" },
  },
  {
    항목: { text: "3.3% Freelancer" },
    "2023년": { text: "$35,300,000", color: "darkBlue" },
    "2022년": { text: "$35,300,000", color: "darkBlue" },
    "2021년": { text: "$35,300,000", color: "darkBlue" },
    "2020년": { text: "$0", color: "darkBlue" },
    "2019년": { text: "$35,300,000", color: "darkBlue" },
  },
  {
    항목: { text: "Employment Income" },
    "2023년": { text: "$0", color: "darkBlue" },
    "2022년": { text: "$0", color: "darkBlue" },
    "2021년": { text: "$0", color: "darkBlue" },
    "2020년": { text: "$0", color: "darkBlue" },
    "2019년": { text: "$0", color: "darkBlue" },
  },
  {
    항목: { text: "Other Income" },
    "2023년": { text: "$0", color: "darkBlue" },
    "2022년": { text: "$0", color: "darkBlue" },
    "2021년": { text: "$0", color: "darkBlue" },
    "2020년": { text: "$0", color: "darkBlue" },
    "2019년": { text: "$0", color: "darkBlue" },
  },
  {
    항목: { text: "Individual Business Income" },
    "2023년": { text: "$0", color: "darkBlue" },
    "2022년": { text: "$0", color: "darkBlue" },
    "2021년": { text: "$0", color: "darkBlue" },
    "2020년": { text: "$0", color: "darkBlue" },
    "2019년": { text: "$0", color: "darkBlue" },
  },
  {
    항목: { text: "Required Expenses", bold: true },
    "2023년": { text: "$6,000,000" },
    "2022년": { text: "$6,000,000" },
    "2021년": { text: "$6,000,000" },
    "2020년": { text: "$0" },
    "2019년": { text: "$6,000,000" },
  },
  {
    항목: { text: "3.3% Freelancer" },
    "2023년": { text: "$6,000,000" },
    "2022년": { text: "$6,000,000" },
    "2021년": { text: "$6,000,000" },
    "2020년": { text: "$0" },
    "2019년": { text: "$6,000,000" },
  },
  {
    항목: { text: "Employment Income" },
    "2023년": { text: "$0" },
    "2022년": { text: "$0" },
    "2021년": { text: "$0" },
    "2020년": { text: "$0" },
    "2019년": { text: "$0" },
  },
  {
    항목: { text: "Other Income" },
    "2023년": { text: "$0" },
    "2022년": { text: "$0" },
    "2021년": { text: "$0" },
    "2020년": { text: "$0" },
    "2019년": { text: "$0" },
  },
  {
    항목: { text: "Individual Business" },
    "2023년": { text: "$0" },
    "2022년": { text: "$0" },
    "2021년": { text: "$0" },
    "2020년": { text: "$0" },
    "2019년": { text: "$0" },
  },
  {
    항목: { text: "Additional Required Expenses", bold: true, color: "darkBlue" },
    "2023년": { text: "$0", isInput: true },
    "2022년": { text: "$0", isInput: true },
    "2021년": { text: "$0", isInput: true },
    "2020년": { text: "$0", isInput: true },
    "2019년": { text: "$0", isInput: true },
  },
  {
    항목: { text: "(Reference: Year-end Card Total)" },
    "2023년": { text: "$6,000,000" },
    "2022년": { text: "$6,000,000" },
    "2021년": { text: "$6,000,000" },
    "2020년": { text: "$0" },
    "2019년": { text: "$6,000,000" },
  },
  {
    항목: { text: "Income Deduction", bold: true },
    "2023년": { text: "$35,300,000", color: "darkBlue" },
    "2022년": { text: "$35,300,000", color: "darkBlue" },
    "2021년": { text: "$35,300,000", color: "darkBlue" },
    "2020년": { text: "$0", color: "darkBlue" },
    "2019년": { text: "$35,300,000", color: "darkBlue" },
  },
  {
    항목: { text: "Additional Income Deduction", bold: true, color: "darkBlue" },
    "2023년": { text: "$0", isInput: true },
    "2022년": { text: "$0", isInput: true },
    "2021년": { text: "$0", isInput: true },
    "2020년": { text: "$0", isInput: true },
    "2019년": { text: "$0", isInput: true },
  },
  {
    항목: { text: "Taxable Income", bold: true },
    "2023년": { text: "$6,000,000" },
    "2022년": { text: "$6,000,000" },
    "2021년": { text: "$6,000,000" },
    "2020년": { text: "$0" },
    "2019년": { text: "$6,000,000" },
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
          padding: isMobile ? "0px" : "0 32px",
        }}
      >
        <Grid item container spacing={4} pt={2} pb={4}>
          <Section1 theme={theme} />

          <Grid item xs={12}>
            <Box sx={{ width: "100%", px: 2 }}>
              <hr style={{ width: "100%", marginTop: "16px" }} />
            </Box>
          </Grid>

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
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <H6>Project Analytics Report</H6>
          </FlexRowAlign>

          <Box mb={2}>
            <H6>Total 6 items</H6>
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
                    minWidth: "800px",
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
                        Item
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>2023</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>2022</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>2021</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>2020</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>2019</TableCell>
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
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <H6>Project Financial Summary</H6>
          </FlexRowAlign>

          <Box mb={2}>
            <H6>Total 15 items</H6>
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
                    minWidth: "800px",
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
                        Item
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>2023</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>2022</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>2021</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>2020</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>2019</TableCell>
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
                            color: row.항목.color === "darkBlue" ? theme.palette.primary.darkBlue : "inherit",
                          }}
                        >
                          {row.항목.text}
                        </TableCell>
                        <TableCell 
                          sx={{ 
                            fontWeight: 400,
                            color: row["2023년"].color === "darkBlue" ? theme.palette.primary.darkBlue : "inherit",
                          }}
                        >
                          {row["2023년"].text}
                        </TableCell>
                        <TableCell 
                          sx={{ 
                            fontWeight: 400,
                            color: row["2022년"].color === "darkBlue" ? theme.palette.primary.darkBlue : "inherit",
                          }}
                        >
                          {row["2022년"].text}
                        </TableCell>
                        <TableCell 
                          sx={{ 
                            fontWeight: 400,
                            color: row["2021년"].color === "darkBlue" ? theme.palette.primary.darkBlue : "inherit",
                          }}
                        >
                          {row["2021년"].text}
                        </TableCell>
                        <TableCell 
                          sx={{ 
                            fontWeight: 400,
                            color: row["2020년"].color === "darkBlue" ? theme.palette.primary.darkBlue : "inherit",
                          }}
                        >
                          {row["2020년"].text}
                        </TableCell>
                        <TableCell 
                          sx={{ 
                            fontWeight: 400,
                            color: row["2019년"].color === "darkBlue" ? theme.palette.primary.darkBlue : "inherit",
                          }}
                        >
                          {row["2019년"].text}
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
