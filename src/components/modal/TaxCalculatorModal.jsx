import { useTheme } from "@emotion/react";
import {
  Box,
  Card,
  Grid,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useMediaQuery,
} from "@mui/material";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import AppTextField from "components/input-fields/AppTextField";
import { H3, H6 } from "components/Typography";
import { useState } from "react";

import { X } from "react-feather";
import IOSSwitch from "components/IOSSwitch";

const tableData = [
  {
    year: "2019년",
    declaration: { isSwitch: true },
    minTax: { isInput: true },
    maxTax: { isInput: true },
  },
  {
    year: "2020년",
    declaration: { isSwitch: true },
    minTax: { isInput: true },
    maxTax: { isInput: true },
  },
  {
    year: "2021년",
    declaration: { isSwitch: true },
    minTax: { isInput: true },
    maxTax: { isInput: true },
  },
  {
    year: "2022년",
    declaration: { isSwitch: true },
    minTax: { isInput: true },
    maxTax: { isInput: true },
  },
  {
    year: "2023년",
    declaration: { isSwitch: true },
    minTax: { isInput: true },
    maxTax: { isInput: true },
  },
];

export default function TaxCalculatorModal({ showModal, setShowModal }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  const [taxDescription, setTaxDescription] = useState("");
  const [fee, setFee] = useState("");
  const [refundPolicy, setRefundPolicy] = useState("");

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "95%" : isTablet ? "800px" : "800px",
    maxHeight: "90vh",
    overflowY: "auto",
    backgroundColor: theme.palette.primary.white,
    border: "none",
    boxShadow: 24,
    outline: "none",
    paddingRight: "30px",
    paddingLeft: "30px",
    scrollbarWidth: "thin",
    borderRadius: 6,
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "transparent",
    },
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <Modal
        open={showModal}
        onClose={handleClose}
        disableEnforceFocus={true}
        disableBackdropClick={false}
        disableEscapeKeyDown={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          backdropFilter: "blur(5px)",
          backgroundColor: "transparent",
          outline: "none",
        }}
      >
        <Card sx={modalStyle}>
          <Grid py={4}>
            <Box
              sx={{
                flexDirection: "row",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <H3>예상세금 견적서</H3>
              <Box
                onClick={() => handleClose()}
                sx={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: theme.palette.borderColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 100,
                  cursor: "pointer",
                  position: "absolute",
                  right: "32px",
                }}
              >
                <X color={theme.palette.grey400} />
              </Box>
            </Box>

            <Box
              pt={1}
              pb={0}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid container spacing={3} py={4} px={isMobile ? 0 : 0}>
                <Grid item xs={12}>
                  <H6 mb={1}>
                    예상세금 관련 설명
                    <span style={{ color: theme.palette.primary.red }}> *</span>
                  </H6>
                  <AppTextField
                    multiline
                    rows={4}
                    name="taxDescription"
                    placeholder="예상세금 관련 설명을 입력해 주세요"
                    value={taxDescription}
                    onChange={(e) => setTaxDescription(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TableContent />
                </Grid>

                <Grid item xs={12}>
                  <H6 mb={1}>
                    수임료 (부가세 포함)
                    <span style={{ color: theme.palette.primary.red }}> *</span>
                  </H6>
                  <AppTextField
                    fullWidth
                    name="fee"
                    placeholder="수임료를 입력해 주세요"
                    value={fee}
                    onChange={(e) => setFee(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <H6 mb={1}>
                    수수료 및 환불 정책
                    <span style={{ color: theme.palette.primary.red }}> *</span>
                  </H6>
                  <AppTextField
                    multiline
                    rows={4}
                    name="refundPolicy"
                    placeholder="수수료 및 환불 정책을 입력해 주세요"
                    value={refundPolicy}
                    onChange={(e) => setRefundPolicy(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Card>
      </Modal>
    </>
  );
}

const TableContent = () => {
  const theme = useTheme();

  return (
    <>
      <Grid item container xs={12} height="100%">
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
                      연도
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>신고 여부</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>
                      예상 최소세액
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>
                      예상 최대세액
                    </TableCell>
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
                      <TableCell sx={{ paddingLeft: "24px !important" }}>
                        {row.year}
                      </TableCell>
                      <TableCell>
                        <IOSSwitch
                          defaultChecked={false}
                          onChange={(e) => {}}
                        />
                      </TableCell>
                      <TableCell>
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
                      </TableCell>
                      <TableCell>
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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
