import React, { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  useMediaQuery,
  Modal,
} from "@mui/material";
import FlexBox from "components/flexbox/FlexBox";
import { H5, H6, Small, TableContent, Tiny } from "components/Typography";
import { termUsage } from "data/terms";
import IconX from "assets/icon-close-modal.svg";

const CustomModal = ({ open, setOpen, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "90%" : "44%",
    maxHeight: "90vh", // Set max height for scroll
    overflowY: "auto", // Enable vertical scroll if content overflows
    bgcolor: "background.paper",
    border: "1px solid #E1E1E1",
    boxShadow: 24,
    p: 4,
    scrollbarWidth: "thin", // Firefox
    "&::-webkit-scrollbar": {
      width: "0.4em", // Adjust the width as needed
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "transparent", // Hide scrollbar thumb
    },
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ backdropFilter: "blur(5px)" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card sx={style}>
            <img
              onClick={() => setOpen(false)}
              src={IconX}
              style={{
                width: "30px",
                height: "30px",
                cursor: "pointer",
                position: "absolute",
                top: "22px",
                right: "22px",
              }}
            />
            <Box
              mt={3}
              mb={6}
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <H5>{termUsage.title}</H5>
            </Box>

            <Grid item xs={12}>
              <FlexBox
                gap={1}
                mt={2}
                sx={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: isMobile ? "flex-start" : "center",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    direction: "row",
                    alignItems: "center",
                  }}
                >
                  <TableContent ml={1} style={{ whiteSpace: "pre-line" }}>
                    {termUsage.content}
                  </TableContent>
                </Box>
              </FlexBox>
            </Grid>

            <Divider
              style={{
                width: "100%",
                marginTop: "30px",
                marginBottom: "20px",
              }}
            />

            <Grid
              ml={0}
              mt={1}
              container
              xs={12}
              flexDirection={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              sx={{ width: "100%" }}
              spacing={2}
            >
              <Grid item width={isMobile ? "100%" : 250}>
                <Button
                  // type="submit"
                  variant="outlined"
                  size="small"
                  onClick={() => setOpen(false)}
                  sx={{
                    fontSize: 15.5,
                    fontWeight: 500,
                    borderRadius: 2,
                    minWidth: isMobile ? "100%" : 240,
                    width: isMobile ? "100%" : 240,
                    borderRadius: 2,
                  }}
                >
                  확인
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
      {/* </Box>
      </Box> */}
    </Modal>
  );
};

const TermsModalButton = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    console.log("modal close");
  };

  return (
    <div>
      <Small
        onClick={handleOpen}
        ml={isMobile ? 3.5 : 0}
        style={{
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        약관보기
      </Small>
      <CustomModal open={open} setOpen={setOpen} onClose={handleClose} />
    </div>
  );
};

export default TermsModalButton;
