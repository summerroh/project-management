import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

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
// ----------------------------------
import naver from "assets/fab-naver.png";
import kakao from "assets/fab-kakao.png";
import insta from "assets/fab-insta.png";
import youtube from "assets/fab-youtube.png";
import logo from "assets/sugar_logo.png";
// ----------------------------------
import AppTextField from "components/input-fields/AppTextField";
import { H5, H6, Small, TableContent, Tiny } from "components/Typography";
import { useFormik } from "formik";
import * as Yup from "yup"; // styled components
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import FindAccountModal from "./findAccount-modal";
import IconX from "assets/icon-close-modal.svg";

export default function LoginModal({ open, setShowLoginModal }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [showFindAccountModal, setShowFindAccountModal] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "90%" : "24%",
    maxHeight: "90vh",
    overflowY: "auto",
    bgcolor: "background.paper",
    border: "1px solid #E1E1E1",
    boxShadow: 24,
    p: isMobile ? 4 : 8,
    paddingLeft: isMobile ? 2 : 4,
    paddingRight: isMobile ? 2 : 4,
    scrollbarWidth: "thin", // Firefox
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "transparent", // Hide scrollbar thumb
    },
  };

  const initialValues = {
    fullName: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    address: "",
    zip: "",
    about: "",
  };
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Name is Required!"),
    email: Yup.string().email().required("Email is Required!"),
    phone: Yup.number().min(8).required("Phone is Required!"),
    country: Yup.string().required("Country is Required!"),
    state: Yup.string().required("State is Required!"),
    city: Yup.string().required("City is Required!"),
    address: Yup.string().required("Address is Required!"),
    zip: Yup.string().required("Zip is Required!"),
    about: Yup.string().required("About is Required!"),
  });
  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {},
  });

  const handleClose = () => {
    setShowLoginModal(false);
  };

  return (
    <>
      {showFindAccountModal ? (
        <FindAccountModal
          open={showFindAccountModal}
          setShowModal={setShowFindAccountModal}
        />
      ) : (
        <Modal
          open={open}
          onClose={handleClose}
          disableEnforceFocus={true}
          disableBackdropClick={false} // Disable closing when clicking on the backdrop
          disableEscapeKeyDown={true}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{ backdropFilter: "blur(5px)" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card sx={style}>
                <img
                  onClick={() => setShowLoginModal(false)}
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
                <FlexRowAlign>
                  <img
                    width={100}
                    src={logo}
                    alt={"logo"}
                    style={{
                      cursor: "pointer",
                      marginLeft: "2px",
                      marginBottom: "2px",
                    }}
                  />
                </FlexRowAlign>
                <Box
                  mt={3}
                  mb={6}
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <H5>로그인</H5>
                </Box>

                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TableContent mb={1}>
                        이메일
                        <span style={{ color: theme.palette.primary.red }}>
                          {" "}
                          *
                        </span>
                      </TableContent>
                      <AppTextField
                        fullWidth
                        name="fullName"
                        placeholder=""
                        value={values.fullName}
                        onChange={handleChange}
                        error={Boolean(touched.fullName && errors.fullName)}
                        helperText={touched.fullName && errors.fullName}
                        sx={{
                          "& .MuiOutlinedInput-input::placeholder": {
                            fontWeight: 300,
                            fontSize: 15.5,
                            color: "#B5B7C0",
                          },
                        }}
                        inputProps={{ style: { height: 18 } }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TableContent mb={1}>
                        비밀번호
                        <span style={{ color: theme.palette.primary.red }}>
                          {" "}
                          *
                        </span>
                      </TableContent>
                      <AppTextField
                        fullWidth
                        name="state"
                        placeholder=""
                        value={values.state}
                        onChange={handleChange}
                        error={Boolean(touched.state && errors.state)}
                        helperText={touched.state && errors.state}
                        sx={{
                          "& .MuiOutlinedInput-input::placeholder": {
                            fontWeight: 300,
                            fontSize: 15.5,
                            color: "#B5B7C0",
                          },
                        }}
                        inputProps={{ style: { height: 18 } }}
                      />
                    </Grid>

                    <Grid
                      ml={0}
                      mt={1}
                      container
                      flexDirection={"row"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      sx={{ width: "100%" }}
                      spacing={2}
                    >
                      <Grid item width="100%">
                        <Button
                          // type="submit"
                          variant="contained"
                          size="small"
                          sx={{
                            fontSize: 15.5,
                            fontWeight: 500,
                            minWidth: "100%",
                            width: "100%",
                            borderRadius: 2,
                            background: theme.palette.gradient.purpletoblue,
                            // backgroundColor: "primary.darkBlue",
                            // "&:hover": {
                            //   backgroundColor: "primary.darkBlueHover",
                            // },
                          }}
                        >
                          로그인
                        </Button>
                      </Grid>
                    </Grid>
                    <Grid
                      ml={0}
                      mt={0}
                      mb={0}
                      container
                      flexDirection={"row"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      sx={{ width: "100%" }}
                      spacing={2}
                    >
                      <Grid item width="100%">
                        <Button
                          // type="submit"
                          variant="contained"
                          size="small"
                          sx={{
                            fontSize: 15.5,
                            fontWeight: 500,
                            borderRadius: 2,
                            minWidth: "100%",
                            width: "100%",
                            borderRadius: 2,
                            background: theme.palette.gradient.purpletoblue,
                            // backgroundColor: "primary.darkBlue",
                            // "&:hover": {
                            //   backgroundColor: "primary.darkBlueHover",
                            // },
                          }}
                        >
                          회원가입
                        </Button>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      width="100%"
                      mt={0}
                      sx={{ cursor: "pointer" }}
                      onClick={() => setShowFindAccountModal(true)}
                    >
                      <TableContent>아이디/비밀번호 찾기</TableContent>
                    </Grid>

                    <Divider
                      style={{
                        width: "100%",
                        marginTop: "24px",
                      }}
                    />
                    <Grid item xs={12}>
                      <TableContent mb={1}>
                        SNS 로그인
                        <span style={{ color: theme.palette.primary.red }}>
                          {" "}
                          *
                        </span>
                      </TableContent>

                      <Grid item width={"100%"}>
                        <Button
                          // type="submit"
                          variant="contained"
                          size="small"
                          sx={{
                            fontSize: 15.5,
                            fontWeight: 500,
                            borderRadius: 2,
                            minWidth: "100%",
                            width: "100%",
                            borderRadius: 2,
                            backgroundColor: "primary.naver",
                            "&:hover": {
                              backgroundColor: "primary.naver",
                            },
                          }}
                        >
                          <img
                            src={naver}
                            style={{
                              width: "20px",
                              height: "20px",
                              marginRight: "8px",
                            }}
                          />
                          네이버 로그인
                        </Button>
                      </Grid>
                    </Grid>
                    <Divider
                      style={{
                        width: "100%",
                        marginTop: "24px",
                        marginBottom: "24px",
                      }}
                    />

                    <FlexRowAlign
                      sx={{
                        justifyContent: "space-between",
                        alignItems: "space-between",
                        width: "100%",
                        padding: "0px 34px",
                      }}
                    >
                      <img
                        src={kakao}
                        alt={"icon"}
                        width={40}
                        style={{
                          marginRight: "4px",
                          objectFit: "contain",
                          cursor: "pointer",
                        }}
                      />
                      <img
                        src={youtube}
                        alt={"icon"}
                        width={40}
                        style={{
                          marginRight: "4px",
                          objectFit: "contain",
                          cursor: "pointer",
                        }}
                      />
                      <img
                        src={naver}
                        alt={"icon"}
                        width={40}
                        style={{
                          marginRight: "4px",
                          objectFit: "contain",
                          cursor: "pointer",
                        }}
                      />
                      <img
                        src={insta}
                        alt={"icon"}
                        width={40}
                        style={{
                          marginRight: "4px",
                          objectFit: "contain",
                          cursor: "pointer",
                        }}
                      />
                    </FlexRowAlign>
                  </Grid>
                </form>
              </Card>
            </Grid>
          </Grid>
        </Modal>
      )}
    </>
  );
}

// const LoginModalButton = () => {
//   const [open, setOpen] = useState(false);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => {
//     console.log("modal close");
//     // setOpen(false);
//   };

//   return (
//     <div>
//       {/* <Button onClick={handleOpen}> */}
//       <H6
//         fontWeight={600}
//         onClick={handleOpen}
//         style={{ cursor: "pointer", whiteSpace: "nowrap" }}
//       >
//         로그인
//       </H6>
//       {/* </Button> */}
//       <CustomModal open={open} onClose={handleClose} />
//     </div>
//   );
// };

// export default LoginModalButton;
