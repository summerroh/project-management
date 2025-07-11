import { useTheme } from "@emotion/react";
import { Box, Button, Card, Grid, Modal, useMediaQuery } from "@mui/material";
import error from "assets/lottie/error.json";
import { H1, H8 } from "components/Typography";
import Lottie from "lottie-react";

export default function ErrorModal({ showModal, setShowModal }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "95%" : isTablet ? "450px" : "450px",
    maxHeight: "90vh",
    overflowY: "auto",
    backgroundColor: theme.palette.primary.white,
    border: "none",
    boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.4)",
    outline: "none",
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
        <Box
          sx={{
            backgroundColor: theme.palette.primary.red,
            height: "110px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,
          }}
        >
          <Lottie
            animationData={error}
            loop={false}
            autoplay={true}
            style={{
              width: "100px",
              height: "100px",
            }}
          />
        </Box>
        <Grid py={3} px={3} textAlign="center">
          <H1
            fontSize={30}
            textAlign="center"
            mb={1}
            color={theme.palette.primary.red}
          >
            경고!
          </H1>
          <H8 textAlign="center" style={{ fontWeight: 400 }}>
            접근 권한이 없습니다.
            <br />
            로그인 또는 관리자에게 문의 해주세요.
          </H8>
          <Box display="flex" justifyContent="center" mt={3}>
            <Button
              variant="contained"
              onClick={handleClose}
              sx={{
                color: theme.palette.primary.white,
                backgroundColor: theme.palette.primary.red,
                borderRadius: "20px",
                minWidth: "100px",
                "&:hover": {
                  backgroundColor: theme.palette.primary.red,
                },
              }}
            >
              OK
            </Button>
          </Box>
        </Grid>
      </Card>
    </Modal>
  );
}
