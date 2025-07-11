import { useTheme } from "@emotion/react";
import { Box, Button, Card, Grid, Modal, useMediaQuery } from "@mui/material";
import { H6 } from "components/Typography";

export default function InfoModal({ showModal, setShowModal, content }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "95%" : "350px",
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
          <Grid>
            <Box
              pt={1}
              pb={0}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid container spacing={2} py={4}>
                <Grid item xs={12}>
                  <H6 textAlign="center">{content}</H6>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    onClick={() => handleClose()}
                    variant="outlined"
                    sx={{
                      mt: 1,
                      width: "100%",
                      py: "12px",
                    }}
                  >
                    확인
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Card>
      </Modal>
    </>
  );
}
