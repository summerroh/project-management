import { useTheme } from "@emotion/react";
import { Avatar, Button, Card, Modal, useMediaQuery } from "@mui/material";
import { H3, H6 } from "components/Typography";
import { X } from "react-feather";
import avatar5 from "assets/avatar-5.png";

export default function FollowConfirmModal({ showModal, setShowModal }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "95%" : "450px",
    maxHeight: "90vh",
    overflow: "visible",
    backgroundColor: theme.palette.primary.white,
    border: "none",
    boxShadow: 24,
    outline: "none",
    padding: "30px",
    paddingTop: "60px",
    scrollbarWidth: "thin",
    borderRadius: 6,
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "transparent",
    },
  };

  const handleClose = () => setShowModal(false);

  return (
    <Modal
      open={showModal}
      onClose={handleClose}
      disableEnforceFocus
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{
        backdropFilter: "blur(5px)",
        backgroundColor: "transparent",
        outline: "none",
      }}
    >
      <Card sx={modalStyle}>
        <Avatar
          src={avatar5}
          sx={{
            width: 80,
            height: 80,
            position: "absolute",
            top: -40,
            left: "50%",
            transform: "translateX(-50%)",
            border: `4px solid ${theme.palette.primary.white}`,
            boxShadow: `0px 0px 20px ${theme.palette.primary.dark}30`,
          }}
        />
        <div style={{ position: "relative", textAlign: "center" }}>
          <H3>디자이너 ** 님을 팔로우하였습니다.</H3>
          {/* <div
            onClick={handleClose}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "32px",
              height: "32px",
              backgroundColor: theme.palette.borderColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          >
            <X color={theme.palette.grey400} />
          </div> */}
        </div>

        <H6 style={{ textAlign: "center", margin: "16px 0" }}>
          내 팔로잉관리에서 설정을 변경할 수 있습니다.
        </H6>

        <Button
          onClick={handleClose}
          variant="contained"
          fullWidth
          sx={{
            background: theme.palette.gradient.purpletoblue,
            py: "12px",
          }}
        >
          확인
        </Button>
      </Card>
    </Modal>
  );
}
